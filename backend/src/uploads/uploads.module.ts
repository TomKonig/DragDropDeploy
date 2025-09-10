import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
