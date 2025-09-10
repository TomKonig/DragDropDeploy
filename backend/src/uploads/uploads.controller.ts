import { Controller, Post, UploadedFile, UseInterceptors, Param, Request, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from '../projects/projects.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('uploads')
export class UploadsController {
  constructor(private projects: ProjectsService, private prisma: PrismaService) {}

  @Post('project/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Request() req: any, @Param('id') id: string, @UploadedFile() file?: any) {
    if (!file) throw new ForbiddenException('File missing');
    // Confirm ownership
    await this.projects.findOneOwned(req.user.sub, id);
    // Create deployment record placeholder
    const deployment = await this.prisma.deployment.create({
      data: {
        projectId: id,
        userId: req.user.sub,
        status: 'PENDING',
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
