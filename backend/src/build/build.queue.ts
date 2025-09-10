import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuildJobStatus } from '@prisma/client';

@Injectable()
export class BuildQueueService {
  private readonly logger = new Logger(BuildQueueService.name);
  constructor(private readonly prisma: PrismaService) {}

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
    this.simulateJobLifecycle(job.id).catch(e => this.logger.error(`Lifecycle simulation error for ${job.id}: ${e}`));
    return job;
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
    return new Promise<void>(resolve => setTimeout(resolve, ms));
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
}
