import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildController } from './build.controller';
import { BuildQueueService } from './build.queue';

@Module({
  imports: [PrismaModule],
  controllers: [BuildController],
  providers: [BuildQueueService],
  exports: [BuildQueueService],
})
export class BuildModule {}
