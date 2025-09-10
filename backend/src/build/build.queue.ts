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
    setTimeout(() => {
      this.prisma.buildJob.update({ where: { id: job.id }, data: { status: BuildJobStatus.RUNNING } })
        .then(() => setTimeout(() => {
          this.prisma.buildJob.update({ where: { id: job.id }, data: { status: BuildJobStatus.SUCCESS } })
            .catch(e => this.logger.warn(`Final status update failed for job ${job.id}: ${e}`));
        }, 75))
        .catch(e => this.logger.warn(`RUNNING status update failed for job ${job.id}: ${e}`));
    }, 25);
    return job;
  }

  async getJob(id: string) {
    return this.prisma.buildJob.findUnique({ where: { id } });
  }
}
