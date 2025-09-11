import { Controller, Param, Post, Get, Query, NotFoundException } from '@nestjs/common';
import { BuildQueueService } from './build.queue';

@Controller('builds')
export class BuildController {
  constructor(private readonly buildQueue: BuildQueueService) {}

  @Post(':projectId')
  async create(@Param('projectId') projectId: string) {
    const job = await this.buildQueue.enqueue(projectId);
  return { queued: true, id: job.id, status: job.status, projectId: job.projectId };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const job = await this.buildQueue.getJob(id);
    if (!job) throw new NotFoundException('Build not found');
    return job;
  }

  @Get('project/:projectId')
  async listForProject(
    @Param('projectId') projectId: string,
    @Query('limit') limit = '20',
  ) {
    const builds = await this.buildQueue.listProjectBuilds(projectId, parseInt(limit, 10) || 20);
    return builds;
  }
}
