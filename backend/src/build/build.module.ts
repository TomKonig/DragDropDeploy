import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildController } from './build.controller';
import { BuildQueueService } from './build.queue';
import { BuildExecutorService } from './build.executor';

@Module({
  imports: [PrismaModule],
  controllers: [BuildController],
  providers: [BuildQueueService, BuildExecutorService],
  exports: [BuildQueueService, BuildExecutorService],
})
export class BuildModule {}
