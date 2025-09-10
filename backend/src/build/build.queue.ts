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
    const job = await this.prisma.buildJob.create({ data: { projectId, status: BuildJobStatus.PENDING } });
    // Fire-and-forget lifecycle simulation (will be replaced by real queue worker)
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
}
