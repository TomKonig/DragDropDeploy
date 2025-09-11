import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { BuildJobStatus } from '@prisma/client';
import { Queue, QueueEvents, Worker, JobsOptions, Job } from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class BuildQueueService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(BuildQueueService.name);
  private queue?: Queue;
  private queueEvents?: QueueEvents;
  private worker?: Worker;
  private redis?: IORedis;
  private useBull: boolean;
  private initPromise?: Promise<void>;

  constructor(private readonly prisma: PrismaService) {
    this.useBull = !!process.env.REDIS_URL;
  }

  async onModuleInit() {
    if (!this.useBull) return;
    try {
      await this.initializeBull();
    } catch (err) {
      this.logger.error('Failed to initialize BullMQ, falling back to in-process simulation', err as any);
      // Attempt cleanup of partially initialized resources
      try { await this.worker?.close(); } catch {}
      try { await this.queue?.close(); } catch {}
      try { await this.queueEvents?.close(); } catch {}
      try { await this.redis?.quit(); } catch {}
      this.useBull = false;
    }
  }

  private async initializeBull() {
    // Lazy create Redis connection & queue
  // BullMQ recommends maxRetriesPerRequest = null so it can manage retries internally.
  this.redis = new IORedis(process.env.REDIS_URL as string, { maxRetriesPerRequest: null as any });
    this.queue = new Queue('builds', { connection: this.redis });
    this.queueEvents = new QueueEvents('builds', { connection: this.redis });
    // Worker processes jobs: update status transitions and mark success
    this.worker = new Worker('builds', async job => {
      const { buildJobId } = job.data as { buildJobId: string };
      const logsDir = this.ensureLogsDir();
      const logFile = path.join(logsDir, `${buildJobId}.log`);
      const append = (line: string) => {
        try { fs.appendFileSync(logFile, line + '\n'); } catch (e) { this.logger.warn(`Failed to append log: ${e}`); }
      };
      try {
        append(`[start] build ${buildJobId}`);
        await this.prisma.buildJob.update({ where: { id: buildJobId }, data: { status: BuildJobStatus.RUNNING, logsPath: logFile } });
        append('status: RUNNING');
        // Simulated steps
        append('step: detect build configuration (simulated)');
        await this.simulatedWork(50);
        append('step: install dependencies (simulated)');
        await this.simulatedWork(50);
        append('step: build output (simulated)');
        await this.simulatedWork(50);
        append('status: SUCCESS');
        await this.prisma.buildJob.update({ where: { id: buildJobId }, data: { status: BuildJobStatus.SUCCESS } });
      } catch (e) {
        append('status: FAILED');
        this.logger.error(`BullMQ worker error for build ${buildJobId}: ${e}`);
        try { await this.prisma.buildJob.update({ where: { id: buildJobId }, data: { status: BuildJobStatus.FAILED } }); } catch {}
        throw e;
      }
    }, { connection: this.redis });

    this.worker.on('failed', (job, err) => {
      this.logger.warn(`Build job failed (queue) id=${job?.id}: ${err.message}`);
    });
  }

  /**
   * Enqueue a build. Without Redis yet, simulate PENDING -> RUNNING -> SUCCESS.
   */
  async enqueue(projectId: string) {
    // Concurrency gate: reject if active build exists
    const active = await this.prisma.buildJob.findFirst({
      where: { projectId, status: { in: [BuildJobStatus.PENDING, BuildJobStatus.RUNNING] } },
      select: { id: true }
    });
    if (active) {
      return active as any; // Caller can decide to treat as existing active build (UI can poll)
    }
    // Determine next version (max existing version + 1) atomically in a transaction
    const job = await this.prisma.$transaction(async (tx) => {
      const maxVersion = await tx.buildJob.aggregate({
        where: { projectId, version: { not: null } },
        _max: { version: true }
      });
      const nextVersion = (maxVersion._max.version || 0) + 1;
      return tx.buildJob.create({ data: { projectId, status: BuildJobStatus.PENDING, version: nextVersion } });
    });
    if (this.useBull && this.queue) {
      // Schedule job in BullMQ
      const opts: JobsOptions = { removeOnComplete: 25, removeOnFail: 50 }; // retention caps
      await this.queue.add('build', { buildJobId: job.id }, opts);
      return job;
    } else {
      this.simulateJobLifecycle(job.id).catch(e => this.logger.error(`Lifecycle simulation error for ${job.id}: ${e}`));
      return job;
    }
  }

  private async simulateJobLifecycle(jobId: string) {
    try {
      await this.sleep(25);
  const logFile = this.createLogFile(jobId);
  await this.prisma.buildJob.update({ where: { id: jobId }, data: { status: BuildJobStatus.RUNNING, logsPath: logFile } });
  this.appendLog(jobId, '[start] build ' + jobId);
  this.appendLog(jobId, 'status: RUNNING');
    } catch (e) {
      this.logger.warn(`RUNNING status update failed for job ${jobId}: ${e}`);
      return; // abort further transitions
    }
    try {
      await this.sleep(75);
  this.appendLog(jobId, 'status: SUCCESS');
  await this.prisma.buildJob.update({ where: { id: jobId }, data: { status: BuildJobStatus.SUCCESS } });
    } catch (e) {
  this.appendLog(jobId, 'status: FAILED');
      this.logger.warn(`Final status update failed for job ${jobId}: ${e}`);
    }
  }

  private sleep(ms: number) {
    return new Promise<void>(resolve => {
      const t = setTimeout(resolve, ms);
      if (typeof (t as any).unref === 'function') (t as any).unref();
    });
  }

  async getJob(id: string) {
    return this.prisma.buildJob.findUnique({ where: { id } });
  }

  async listProjectBuilds(projectId: string, limit: number) {
    return this.prisma.buildJob.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getLogs(buildId: string, tail?: number) {
    const job = await this.getJob(buildId);
    if (!job || !job.logsPath) return '';
    try {
      const data = fs.readFileSync(job.logsPath, 'utf8');
      if (tail) {
        const lines = data.trimEnd().split(/\r?\n/);
        return lines.slice(-tail).join('\n');
      }
      return data;
    } catch (e) {
      this.logger.warn(`Unable to read logs for ${buildId}: ${e}`);
      return '';
    }
  }

  private logsBaseDir() {
    return path.join(process.cwd(), 'backend', 'artifacts', 'build-logs');
  }
  private ensureLogsDir() {
    const dir = this.logsBaseDir();
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
  }
  private createLogFile(buildId: string) {
    const dir = this.ensureLogsDir();
    const file = path.join(dir, `${buildId}.log`);
    fs.writeFileSync(file, '');
    return file;
  }
  private appendLog(buildId: string, line: string) {
    const dir = this.ensureLogsDir();
    const file = path.join(dir, `${buildId}.log`);
    try { fs.appendFileSync(file, line + '\n'); } catch {}
  }
  private async simulatedWork(ms: number) { await this.sleep(ms); }

  async onModuleDestroy() {
    // Ensure initialization settled before attempting shutdown
    if (this.initPromise) {
      try { await this.initPromise; } catch { /* already logged */ }
    }
    const tasks: Promise<any>[] = [];
    if (this.worker) tasks.push(this.worker.close().catch(()=>null));
    if (this.queue) tasks.push(this.queue.close().catch(()=>null));
    if (this.queueEvents) tasks.push(this.queueEvents.close().catch(()=>null));
    if (this.redis) tasks.push(this.redis.quit().catch(()=>null));
    if (tasks.length) {
      await Promise.all(tasks);
      this.logger.debug('BullMQ resources shut down');
    }
  }
}
