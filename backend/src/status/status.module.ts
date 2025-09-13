import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";

import { StatusController } from "./status.controller";

@Module({
  imports: [PrismaModule],
  controllers: [StatusController],
})
export class StatusModule {}
