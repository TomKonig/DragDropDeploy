import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
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
      try {
        await this.prisma.buildJob.update({ where: { id: buildJobId }, data: { status: BuildJobStatus.RUNNING } });
  // Simulated build work (execution logic pending)
        await new Promise(r => {
          const t = setTimeout(r, 75);
          // Allow Jest / Node to exit without waiting for this simulated work
          if (typeof (t as any).unref === 'function') (t as any).unref();
        });
        await this.prisma.buildJob.update({ where: { id: buildJobId }, data: { status: BuildJobStatus.SUCCESS } });
      } catch (e) {
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
      await this.prisma.buildJob.update({ where: { id: jobId }, data: { status: BuildJobStatus.RUNNING } });
    } catch (e) {
      this.logger.warn(`RUNNING status update failed for job ${jobId}: ${e}`);
      return; // abort further transitions
    }
    try {
      await this.sleep(75);
      await this.prisma.buildJob.update({ where: { id: jobId }, data: { status: BuildJobStatus.SUCCESS } });
    } catch (e) {
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
