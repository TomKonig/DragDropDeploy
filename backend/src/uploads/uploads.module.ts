import { Module } from "@nestjs/common";

import { ProjectsModule } from "../projects/projects.module";

import { UploadsController } from "./uploads.controller";

@Module({
  imports: [ProjectsModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
