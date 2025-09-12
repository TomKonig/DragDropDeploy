import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildController } from './build.controller';
import { BuildQueueService } from './build.queue';
import { BuildExecutorService } from './build.executor';
import { MinifyService } from '../minify/minify.service';
import { DeploymentsModule } from '../deployments/deployments.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [PrismaModule, forwardRef(() => DeploymentsModule), MetricsModule],
  controllers: [BuildController],
  providers: [BuildQueueService, BuildExecutorService, MinifyService],
  exports: [BuildQueueService, BuildExecutorService, MinifyService],
})
export class BuildModule {}
