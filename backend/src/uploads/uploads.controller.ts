import { Controller, Post, UploadedFile, UseInterceptors, Param, Request, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from '../projects/projects.service';

@Controller('uploads')
export class UploadsController {
  constructor(private projects: ProjectsService) {}

  @Post('project/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Request() req: any, @Param('id') id: string, @UploadedFile() file?: any) {
    if (!file) throw new ForbiddenException('File missing');
    // Confirm ownership
    await this.projects.findOneOwned(req.user.sub, id);
    // Placeholder: In future, store file in object storage and enqueue build
    return {
      projectId: id,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      status: 'RECEIVED',
    };
  }
}
