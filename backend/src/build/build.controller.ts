import { Controller, Param, Post } from '@nestjs/common';
import { BuildQueueService } from './build.queue';

@Controller('builds')
export class BuildController {
  constructor(private readonly buildQueue: BuildQueueService) {}

  @Post(':projectId')
  async create(@Param('projectId') projectId: string) {
    const job = await this.buildQueue.enqueue(projectId);
  return { queued: true, id: job.id, status: job.status, projectId: job.projectId };
  }
}
