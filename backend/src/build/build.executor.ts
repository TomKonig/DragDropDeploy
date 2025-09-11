import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

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
  private enabled = process.env.BUILD_EXECUTION_ENABLED === 'true';

  isEnabled() { return this.enabled; }

  async runBuild(projectId: string, logFile: string): Promise<{ success: boolean; exitCode: number | null; }> {
    if (!this.enabled) {
      this.append(logFile, 'executor: disabled (simulation fallback)');
      return { success: true, exitCode: 0 };
    }
    // For now assume repo root build; later project scoping.
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      this.append(logFile, 'executor: package.json not found, skipping real build');
      return { success: true, exitCode: 0 };
    }
    return new Promise(resolve => {
      this.append(logFile, 'executor: starting real build (npm run build --if-present)');
      const child = spawn('npm', ['run', 'build', '--if-present'], { cwd, env: this.safeEnv(), stdio: ['ignore', 'pipe', 'pipe'] });
      child.stdout.on('data', d => this.writeStream(logFile, d));
      child.stderr.on('data', d => this.writeStream(logFile, d));
      child.on('close', code => {
        this.append(logFile, `executor: build process exited code=${code}`);
        resolve({ success: code === 0, exitCode: code });
      });
      child.on('error', err => {
        this.append(logFile, `executor: error spawning build: ${err.message}`);
        resolve({ success: false, exitCode: null });
      });
    });
  }

  private safeEnv() {
    // Pass through limited env to reduce leakage
    const allowlist = ['PATH', 'HOME', 'NODE_ENV'];
    const result: Record<string,string> = {};
    for (const k of allowlist) if (process.env[k]) result[k] = process.env[k] as string;
    result['CI'] = 'true';
    return result;
  }

  private writeStream(logFile: string, chunk: any) {
    const txt = this.redact(chunk.toString());
    try { fs.appendFileSync(logFile, txt.replace(/\r/g, '')); } catch {}
  }
  private append(logFile: string, line: string) {
    try { fs.appendFileSync(logFile, line + '\n'); } catch {}
  }
  private redact(line: string) {
    // Simple redactions: bearer tokens, long hex strings, potential secrets.
    return line
      .replace(/Bearer [A-Za-z0-9\-_.]+/g, 'Bearer [REDACTED]')
      .replace(/[A-Fa-f0-9]{32,}/g, '[HEX_REDACTED]')
      .replace(/(API|SECRET|TOKEN|PASSWORD|KEY)=([^\s]+)/gi, '$1=[REDACTED]');
  }
}
