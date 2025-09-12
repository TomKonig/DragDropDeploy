import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Request,
  ForbiddenException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { PrismaService } from "../prisma/prisma.service";
import { ProjectsService } from "../projects/projects.service";

interface AuthUser {
  sub: string;
}
interface UploadRequest {
  user: AuthUser;
}
interface UploadedExpressMulterFile {
  originalname: string;
  size: number;
  mimetype: string;
  buffer?: Buffer;
}

@Controller("uploads")
export class UploadsController {
  constructor(
    private projects: ProjectsService,
    private prisma: PrismaService,
  ) {}

  @Post("project/:id")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @Request() req: UploadRequest,
    @Param("id") id: string,
    @UploadedFile() file?: UploadedExpressMulterFile,
  ) {
    if (!file) throw new ForbiddenException("File missing");
    if (!req?.user?.sub) throw new ForbiddenException("Unauthenticated");
    // Confirm ownership
    await this.projects.findOneOwned(req.user.sub, id);
    // Create initial deployment record
    const deployment = await this.prisma.deployment.create({
      data: {
        projectId: id,
        userId: req.user.sub,
        status: "PENDING",
      },
    });
    return {
      projectId: id,
      deploymentId: deployment.id,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      status: deployment.status,
    };
  }
}
