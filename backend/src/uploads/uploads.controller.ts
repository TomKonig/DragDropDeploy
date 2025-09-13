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

export interface AuthUser {
  sub: string;
}
export interface UploadRequest {
  user: AuthUser;
}
export interface UploadedExpressMulterFile {
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
    // Confirm ownership (will throw NotFound -> maps to 404, not 500)
    await this.projects.findOneOwned(req.user.sub, id);

    const createDeployment = async () =>
      this.prisma.deployment.create({
        data: {
          projectId: id,
          userId: req.user.sub,
          status: "PENDING",
        },
      });

    let deployment;
    try {
      deployment = await createDeployment();
    } catch (e) {
      // Handle rare FK race (user/project deleted concurrently) with a single retry
      if (
        e &&
        typeof e === "object" &&
        (e as { code?: string }).code === "P2003"
      ) {
        const [projectStillThere, userStillThere] = await Promise.all([
          this.prisma.project.findUnique({ where: { id } }),
          this.prisma.user.findUnique({ where: { id: req.user.sub } }),
        ]);
        if (projectStillThere && userStillThere) {
          deployment = await createDeployment();
        } else {
          throw new ForbiddenException("Upload target no longer available");
        }
      } else {
        throw e;
      }
    }

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
