import {
  Controller,
  Param,
  Post,
  Get,
  Query,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { BuildJob } from "@prisma/client";

import { BuildQueueService } from "./build.queue";

@Controller("builds")
export class BuildController {
  constructor(private readonly buildQueue: BuildQueueService) {}

  @Post(":projectId")
  async create(
    @Param("projectId") projectId: string,
  ): Promise<{
    queued: true;
    id: string;
    status: string | null;
    projectId: string;
  }> {
    if (!/^c[a-z0-9]{24,}$/i.test(projectId))
      throw new BadRequestException("Invalid projectId");
    const job = await this.buildQueue.enqueue(projectId);
    return {
      queued: true,
      id: job.id,
      status: job.status,
      projectId: job.projectId,
    };
  }

  @Get(":id")
  async getOne(@Param("id") id: string): Promise<BuildJob> {
    if (!/^c[a-z0-9]{24,}$/i.test(id))
      throw new BadRequestException("Invalid id");
    const job = await this.buildQueue.getJob(id);
    if (!job) throw new NotFoundException("Build not found");
    return job;
  }

  @Get("project/:projectId")
  async listForProject(
    @Param("projectId") projectId: string,
    @Query("limit") limit = "20",
  ): Promise<BuildJob[]> {
    if (!/^c[a-z0-9]{24,}$/i.test(projectId))
      throw new BadRequestException("Invalid projectId");
    const builds = await this.buildQueue.listProjectBuilds(
      projectId,
      parseInt(limit, 10) || 20,
    );
    return builds;
  }

  @Get(":id/logs")
  async getLogs(
    @Param("id") id: string,
    @Query("tail") tail?: string,
  ): Promise<{ id: string; logs: string }> {
    if (!/^c[a-z0-9]{24,}$/i.test(id))
      throw new BadRequestException("Invalid id");
    const job = await this.buildQueue.getJob(id);
    if (!job) throw new NotFoundException("Build not found");
    const txt = await this.buildQueue.getLogs(
      id,
      tail ? parseInt(tail, 10) : undefined,
    );
    return { id, logs: txt };
  }
}
