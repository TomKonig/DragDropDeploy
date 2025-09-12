import { Controller, Get } from "@nestjs/common";

import { Roles } from "../auth/roles.decorator";
import { PrismaService } from "../prisma/prisma.service";

@Controller("status")
export class StatusController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Roles("OPERATOR", "ADMIN")
  async status() {
    // simple db check - count users (cheap)
    const dbOk = await this.prisma.user
      .count()
      .then(() => true)
      .catch(() => false);
    return {
      service: "api",
      version: process.env.APP_VERSION || "0.0.1",
      timestamp: new Date().toISOString(),
      dbOk,
      node: process.version,
    };
  }
}
