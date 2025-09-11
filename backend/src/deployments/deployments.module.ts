import { Module } from '@nestjs/common';
import { DeploymentsController } from './deployments.controller';
import { UploadExtractionService } from './upload-extraction.service';
import { DeploymentsService } from './deployments.service';

@Module({
  controllers: [DeploymentsController],
  providers: [UploadExtractionService, DeploymentsService],
})
export class DeploymentsModule {}
