import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from "@nestjs/common";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectsService } from "./projects.service";

export interface AuthenticatedUser {
  sub: string;
}
export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}

@Controller("projects")
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() dto: CreateProjectDto) {
    return this.projects.create(req.user.sub, dto.name, dto.domain);
  }

  @Get()
  list(@Request() req: AuthenticatedRequest) {
    return this.projects.findAllForUser(req.user.sub);
  }

  @Get(":id")
  get(@Request() req: AuthenticatedRequest, @Param("id") id: string) {
    return this.projects.findOneOwned(req.user.sub, id);
  }

  @Patch(":id")
  update(
    @Request() req: AuthenticatedRequest,
    @Param("id") id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projects.update(req.user.sub, id, dto);
  }

  @Delete(":id")
  delete(@Request() req: AuthenticatedRequest, @Param("id") id: string) {
    return this.projects.remove(req.user.sub, id);
  }
}
