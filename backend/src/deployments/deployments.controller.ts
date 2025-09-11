import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('deployments')
export class DeploymentsController {
  @Post('upload')
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  uploadSkeleton() {
    return { message: 'Upload pipeline not yet implemented', status: 'NOT_IMPLEMENTED' };
  }
}
