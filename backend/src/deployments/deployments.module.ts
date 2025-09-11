import { Module, forwardRef } from '@nestjs/common';
import { DeploymentsController } from './deployments.controller';
import { UploadExtractionService } from './upload-extraction.service';
import { DeploymentsService } from './deployments.service';
import { BuildModule } from '../build/build.module';

@Module({
  imports: [forwardRef(() => BuildModule)],
  controllers: [DeploymentsController],
  providers: [UploadExtractionService, DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}
