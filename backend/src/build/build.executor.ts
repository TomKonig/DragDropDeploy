import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

import { Injectable, Logger } from "@nestjs/common";

import { MetricsService } from "../metrics/metrics.service";
import { MinifyService } from "../minify/minify.service";
import { PrismaService } from "../prisma/prisma.service";

/**
 * BuildExecutorService: performs a real build process (opt-in) capturing stdout/err to log file.
 * Current minimal strategy:
 *  - Detects presence of package.json in project workspace (future: project specific path)
 *  - Runs `npm run build --if-present` and records exit code
 *  - Redacts any occurrence of bearer tokens or typical secret patterns before writing logs
 */
@Injectable()
export class BuildExecutorService {
  private readonly logger = new Logger(BuildExecutorService.name);
  private enabled = process.env.BUILD_EXECUTION_ENABLED === "true";

  constructor(
    private readonly metrics: MetricsService,
    private readonly minify: MinifyService,
    private readonly prisma: PrismaService,
  ) {}

  isEnabled() {
    return this.enabled;
  }

  async runBuild(
    projectId: string,
    logFile: string,
  ): Promise<{ success: boolean; exitCode: number | null }> {
    if (!this.enabled) {
      this.metrics.recordProjectBuildStart(projectId);
      this.append(logFile, "executor: disabled (simulation fallback)");
      // In simulation mode still attempt minification over any existing artifact folder if present
      await this.runMinify(projectId, logFile);
      return { success: true, exitCode: 0 };
    }
    // For now assume repo root build; later project scoping.
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, "package.json");
    if (!fs.existsSync(pkgPath)) {
      this.append(
        logFile,
        "executor: package.json not found, skipping real build",
      );
      return { success: true, exitCode: 0 };
    }
    const start = process.hrtime.bigint();
    this.metrics.buildStartedCounter.inc();
    this.metrics.recordProjectBuildStart(projectId);
    this.metrics.activeBuildsGauge.inc();
    let flags: string[] = [];
    try {
      flags = await this.getProjectBuildFlags(projectId);
    } catch {
      flags = [];
    }
    const baseArgs = ["run", "build", "--if-present"];
    if (flags.length) baseArgs.push("--", ...flags);
    this.append(
      logFile,
      "executor: starting real build (npm " + baseArgs.join(" ") + ")",
    );
    return await new Promise((resolve) => {
      const child = spawn("npm", baseArgs, {
        cwd,
        env: this.safeEnv(),
        stdio: ["ignore", "pipe", "pipe"],
      });
      child.stdout.on("data", (d: Buffer) => this.writeStream(logFile, d));
      child.stderr.on("data", (d: Buffer) => this.writeStream(logFile, d));
      child.on("close", (code: number | null) => {
        void (async () => {
          try {
            const end = process.hrtime.bigint();
            const seconds = Number(end - start) / 1e9;
            this.metrics.buildDurationHistogram.observe(seconds);
            this.metrics.activeBuildsGauge.dec();
            this.append(
              logFile,
              `executor: build process exited code=${code} duration_s=${seconds.toFixed(3)}`,
            );
            if (code === 0) await this.runMinify(projectId, logFile);
            resolve({ success: code === 0, exitCode: code });
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.append(
              logFile,
              `executor: error finalizing build close handler: ${msg}`,
            );
            resolve({ success: false, exitCode: null });
          }
        })();
      });
      child.on("error", (err: Error) => {
        const end = process.hrtime.bigint();
        const seconds = Number(end - start) / 1e9;
        this.metrics.buildDurationHistogram.observe(seconds);
        this.metrics.activeBuildsGauge.dec();
        this.append(logFile, `executor: error spawning build: ${err.message}`);
        resolve({ success: false, exitCode: null });
      });
    });
  }

  private safeEnv() {
    // Pass through limited env to reduce leakage
    const allowlist = ["PATH", "HOME", "NODE_ENV"];
    const result: Record<string, string> = {};
    for (const k of allowlist) if (process.env[k]) result[k] = process.env[k];
    result["CI"] = "true";
    return result;
  }

  private writeStream(logFile: string, chunk: Buffer | string) {
    const raw = typeof chunk === "string" ? chunk : chunk.toString("utf8");
    const txt = this.redact(raw);
    try {
      fs.appendFileSync(logFile, txt.replace(/\r/g, ""));
    } catch (err) {
      // Log but don't throw; logging failures shouldn't crash build
      this.logger.warn(
        `append stdout/err failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  private append(logFile: string, line: string) {
    try {
      fs.appendFileSync(logFile, line + "\n");
    } catch (err) {
      this.logger.warn(
        `append log failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
  private redact(line: string): string {
    // Simple redactions: bearer tokens, long hex strings, potential secrets & CLI flags
    return line
      .replace(/Bearer [A-Za-z0-9\-_.]+/g, "Bearer [REDACTED]")
      .replace(/[A-Fa-f0-9]{32,}/g, "[HEX_REDACTED]")
      .replace(/(API|SECRET|TOKEN|PASSWORD|KEY)=([^\s]+)/gi, "$1=[REDACTED]")
      .replace(/--(token|secret|key|password)=[^\s]+/gi, "--$1=REDACTED");
  }

  private async getProjectBuildFlags(projectId: string): Promise<string[]> {
    try {
      const settings = await this.prisma.projectSetting.findUnique({
        where: { projectId },
        select: { buildFlags: true },
      });
      if (!settings || !Array.isArray(settings.buildFlags)) return [];
      return settings.buildFlags.filter((f) => typeof f === "string");
    } catch {
      return [];
    }
  }

  private async runMinify(projectId: string, logFile: string) {
    try {
      await this.minify.maybeMinifyProject(projectId, (line: string) =>
        this.append(logFile, line),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      this.append(logFile, `executor: minify error=${msg}`);
    }
  }
}
