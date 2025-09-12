import { Module, forwardRef } from "@nestjs/common";

import { DeploymentsModule } from "../deployments/deployments.module";
import { MetricsModule } from "../metrics/metrics.module";
import { MinifyService } from "../minify/minify.service";
import { PrismaModule } from "../prisma/prisma.module";

import { BuildController } from "./build.controller";
import { BuildExecutorService } from "./build.executor";
import { BuildQueueService } from "./build.queue";

@Module({
  imports: [PrismaModule, forwardRef(() => DeploymentsModule), MetricsModule],
  controllers: [BuildController],
  providers: [BuildQueueService, BuildExecutorService, MinifyService],
  exports: [BuildQueueService, BuildExecutorService, MinifyService],
})
export class BuildModule {}
