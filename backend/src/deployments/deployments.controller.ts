import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import type { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UploadExtractionService } from './upload-extraction.service';
import { DeploymentsService } from './deployments.service';

interface UploadResponse {
  deploymentId: string;
  status: string;
  projectId: string;
  artifactPath: string | null;
}

@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly extraction: UploadExtractionService, private readonly deployments: DeploymentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @HttpCode(HttpStatus.CREATED)
  async uploadArchive(@UploadedFile() file: Express.Multer.File, @Body('projectId') projectId: string): Promise<UploadResponse> {
    if (!file) throw new BadRequestException('file is required');
    const lower = file.originalname.toLowerCase();
    if (!lower.endsWith('.zip')) throw new BadRequestException('Only .zip files supported');
    const maxMb = Number(process.env.MAX_UPLOAD_MB || 25);
    if (file.size > maxMb * 1024 * 1024) throw new BadRequestException(`File exceeds MAX_UPLOAD_MB of ${maxMb}MB`);
    const { tempDir } = await this.extraction.validateAndStage(projectId, file.buffer, file.originalname);
    const deployment = await this.deployments.createWithArtifact(projectId, tempDir);
  return { deploymentId: deployment.id, status: deployment.status, projectId, artifactPath: deployment.artifactPath ?? null };
  }
}
