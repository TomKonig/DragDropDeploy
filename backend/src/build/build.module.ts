import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildController } from './build.controller';
import { BuildQueueService } from './build.queue';
import { BuildExecutorService } from './build.executor';
import { DeploymentsModule } from '../deployments/deployments.module';

@Module({
  imports: [PrismaModule, forwardRef(() => DeploymentsModule)],
  controllers: [BuildController],
  providers: [BuildQueueService, BuildExecutorService],
  exports: [BuildQueueService, BuildExecutorService],
})
export class BuildModule {}
