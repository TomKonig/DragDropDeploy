import { Module, forwardRef } from "@nestjs/common";

import { BuildModule } from "../build/build.module";

import { DeploymentsController } from "./deployments.controller";
import { DeploymentsService } from "./deployments.service";
import { UploadExtractionService } from "./upload-extraction.service";

@Module({
  imports: [forwardRef(() => BuildModule)],
  controllers: [DeploymentsController],
  providers: [UploadExtractionService, DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}
