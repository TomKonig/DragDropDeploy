import * as fs from "fs";
import * as path from "path";

import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { BuildJobStatus } from "@prisma/client";
import { Queue, QueueEvents, Worker, JobsOptions } from "bullmq";
import IORedis from "ioredis";

import { DeploymentsService } from "../deployments/deployments.service";
import { PrismaService } from "../prisma/prisma.service";

import { BuildExecutorService } from "./build.executor";

@Injectable()
export class BuildQueueService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(BuildQueueService.name);
  private queue?: Queue<{ buildJobId: string; projectId?: string }>;
  private queueEvents?: QueueEvents;
  private worker?: Worker<{ buildJobId: string; projectId?: string }>;
  private redis?: IORedis;
  private useBull: boolean;
  private initPromise?: Promise<void>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly executor: BuildExecutorService,
    private readonly deployments: DeploymentsService,
  ) {
    this.useBull = !!process.env.REDIS_URL;
    if (process.env.NODE_ENV === "test" && !process.env.ALLOW_REDIS_IN_TEST) {
      // Avoid external Redis dependency during tests to prevent hanging beforeAll hooks
      this.useBull = false;
    }
  }

  async onModuleInit() {
    if (!this.useBull) return;
    try {
      this.initializeBull();
    } catch (err) {
      this.logger.error(
        "Failed to initialize BullMQ, falling back to in-process simulation",
        err instanceof Error ? err.message : String(err),
      );
      // Attempt cleanup of partially initialized resources
      await Promise.allSettled(
        [
          this.worker?.close(),
          this.queue?.close(),
          this.queueEvents?.close(),
          this.redis?.quit(),
        ].filter(Boolean) as Promise<unknown>[],
      );
      this.useBull = false;
    }
  }

  private initializeBull(): void {
    // Lazy create Redis connection & queue. BullMQ recommends maxRetriesPerRequest = null.
    this.redis = new IORedis(process.env.REDIS_URL as string, {
      maxRetriesPerRequest: null,
    });
    this.queue = new Queue<{ buildJobId: string; projectId?: string }>(
      "builds",
      { connection: this.redis },
    );
    this.queueEvents = new QueueEvents("builds", { connection: this.redis });
    // Worker processes jobs: update status transitions and mark success
    this.worker = new Worker<{ buildJobId: string; projectId?: string }>(
      "builds",
      async (
        job: import("bullmq").Job<{ buildJobId: string; projectId?: string }>,
      ) => {
        const { buildJobId } = job.data;
        const logFile = path.join(
          this.logsBaseDir(),
          `${String(buildJobId)}.log`,
        );
        const append = (line: string) => {
          try {
            fs.appendFileSync(logFile, line + "\n");
          } catch (e) {
            this.logger.warn(
              `Failed to append log: ${e instanceof Error ? e.message : String(e)}`,
            );
          }
        };
        try {
          append(`[start] build ${buildJobId}`);
          await this.prisma.buildJob.update({
            where: { id: buildJobId },
            data: { status: BuildJobStatus.RUNNING, logsPath: logFile },
          });
          append("status: RUNNING");
          if (this.executor.isEnabled()) {
            append("executor: enabled - starting real build");
            const result = await this.executor.runBuild(
              job.data.projectId || "unknown",
              logFile,
            );
            append(
              `executor: result success=${result.success} code=${result.exitCode}`,
            );
            if (!result.success) throw new Error("Real build failed");
          } else {
            // Simulated steps
            append("step: detect build configuration (simulated)");
            await this.simulatedWork(50);
            append("step: install dependencies (simulated)");
            await this.simulatedWork(50);
            append("step: build output (simulated)");
            await this.simulatedWork(50);
          }
          append("status: SUCCESS");
          await this.prisma.buildJob.update({
            where: { id: buildJobId },
            data: { status: BuildJobStatus.SUCCESS },
          });
          // Auto-activate any deployment tied to this build job (one-to-one expected)
          // Activation linking via buildJobId requires latest migration to be deployed.
          // Guard: attempt activation only if column exists by querying deployments filtering by status BUILDING (best-effort heuristic pre-migration).
          await this.attemptActivation(append);
        } catch (e) {
          append("status: FAILED");
          const msg = e instanceof Error ? e.message : String(e);
          this.logger.error(
            `BullMQ worker error for build ${String(buildJobId)}: ${msg}`,
          );
          try {
            await this.prisma.buildJob.update({
              where: { id: buildJobId },
              data: { status: BuildJobStatus.FAILED },
            });
          } catch {
            /* best-effort status update */
          }
          throw e;
        }
      },
      { connection: this.redis },
    );

    this.worker.on(
      "failed",
      (job: import("bullmq").Job | undefined, err: unknown) => {
        const emsg = err instanceof Error ? err.message : String(err);
        this.logger.warn(
          `Build job failed (queue) id=${String(job?.id)}: ${emsg}`,
        );
      },
    );
  }

  /**
   * Enqueue a build. Without Redis yet, simulate PENDING -> RUNNING -> SUCCESS.
   */
  async enqueue(projectId: string) {
    // Concurrency gate: reject if active build exists
    const active = await this.prisma.buildJob.findFirst({
      where: {
        projectId,
        status: { in: [BuildJobStatus.PENDING, BuildJobStatus.RUNNING] },
      },
      select: { id: true, projectId: true, status: true },
    });
    if (active) return active; // existing active build
    // Determine next version (max existing version + 1) atomically in a transaction
    const job = await this.prisma.$transaction(async (tx) => {
      const maxVersion = await tx.buildJob.aggregate({
        where: { projectId, version: { not: null } },
        _max: { version: true },
      });
      const nextVersion = (maxVersion._max.version || 0) + 1;
      return tx.buildJob.create({
        data: {
          projectId,
          status: BuildJobStatus.PENDING,
          version: nextVersion,
        },
      });
    });
    if (this.useBull && this.queue) {
      // Schedule job in BullMQ
      const opts: JobsOptions = { removeOnComplete: 25, removeOnFail: 50 };
      await this.queue.add("build", { buildJobId: job.id, projectId }, opts);
      return job;
    } else {
      void this.simulateJobLifecycle(job.id);
      return job;
    }
  }

  private async simulateJobLifecycle(jobId: string): Promise<void> {
    try {
      await this.sleep(25);
      const logFile = this.createLogFile(jobId);
      await this.prisma.buildJob.update({
        where: { id: jobId },
        data: { status: BuildJobStatus.RUNNING, logsPath: logFile },
      });
      this.appendLog(jobId, "[start] build " + jobId);
      this.appendLog(jobId, "status: RUNNING");
    } catch (e) {
      this.logger.warn(
        `RUNNING status update failed for job ${String(jobId)}: ${String(e)}`,
      );
      return; // abort further transitions
    }
    try {
      if (this.executor.isEnabled()) {
        this.appendLog(jobId, "executor: enabled - starting real build");
        const logFile = path.join(this.logsBaseDir(), `${String(jobId)}.log`);
        const result = await this.executor.runBuild(
          "simulation-project",
          logFile,
        );
        this.appendLog(
          jobId,
          `executor: result success=${result.success} code=${result.exitCode}`,
        );
        if (!result.success)
          throw new Error("Real build failed (in-memory path)");
      } else {
        await this.sleep(75);
      }
      this.appendLog(jobId, "status: SUCCESS");
      await this.prisma.buildJob.update({
        where: { id: jobId },
        data: { status: BuildJobStatus.SUCCESS },
      });
      await this.attemptActivation((line: string) =>
        this.appendLog(jobId, line),
      );
    } catch (e) {
      this.appendLog(jobId, "status: FAILED");
      const msg = e instanceof Error ? e.message : String(e);
      this.logger.warn(
        `Final status update failed for job ${String(jobId)}: ${msg}`,
      );
    }
  }

  private async attemptActivation(append: (line: string) => void) {
    // Activation is best-effort: ignore schema errors or missing rows
    try {
      // Deployment activation seeks deployments currently in BUILDING state
      const candidate = await this.prisma.deployment.findFirst({
        where: { status: "BUILDING" },
      });
      if (!candidate) return;
      try {
        await this.deployments.activateDeployment(candidate.id);
      } catch (e) {
        append(
          "activation: failed " + (e instanceof Error ? e.message : String(e)),
        );
      }
    } catch (e) {
      append(
        "activation: skipped " + (e instanceof Error ? e.message : String(e)),
      );
    }
  }

  private sleep(ms: number) {
    return new Promise<void>((resolve) => {
      const t = setTimeout(resolve, ms);
      t.unref?.();
    });
  }

  async getJob(id: string) {
    return this.prisma.buildJob.findUnique({ where: { id } });
  }

  async listProjectBuilds(projectId: string, limit: number) {
    return this.prisma.buildJob.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async getLogs(buildId: string, tail?: number) {
    const job = await this.getJob(buildId);
    if (!job || !job.logsPath) return "";
    try {
      const data = fs.readFileSync(job.logsPath, "utf8");
      if (tail) {
        const lines = data.trimEnd().split(/\r?\n/);
        return lines.slice(-tail).join("\n");
      }
      return data;
    } catch (e) {
      this.logger.warn(
        `Unable to read logs for ${String(buildId)}: ${String(e)}`,
      );
      return "";
    }
  }

  private logsBaseDir() {
    return path.join(process.cwd(), "backend", "artifacts", "build-logs");
  }
  private ensureLogsDir() {
    const dir = this.logsBaseDir();
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
  }
  private createLogFile(buildId: string) {
    const dir = this.ensureLogsDir();
    const file = path.join(dir, `${buildId}.log`);
    fs.writeFileSync(file, "");
    return file;
  }
  private appendLog(buildId: string, line: string) {
    const dir = this.ensureLogsDir();
    const file = path.join(dir, `${buildId}.log`);
    try {
      fs.appendFileSync(file, line + "\n");
    } catch {
      /* ignore append failure */
    }
  }
  private async simulatedWork(ms: number) {
    await this.sleep(ms);
  }

  async onModuleDestroy() {
    // Ensure initialization settled before attempting shutdown
    if (this.initPromise) {
      try {
        await this.initPromise;
      } catch {
        /* already logged */
      }
    }
    const tasks: Promise<unknown>[] = [];
    if (this.worker) tasks.push(this.worker.close().catch(() => null));
    if (this.queue) tasks.push(this.queue.close().catch(() => null));
    if (this.queueEvents)
      tasks.push(this.queueEvents.close().catch(() => null));
    if (this.redis) tasks.push(this.redis.quit().catch(() => null));
    if (tasks.length) {
      await Promise.all(tasks);
      this.logger.debug("BullMQ resources shut down");
    }
  }
}
