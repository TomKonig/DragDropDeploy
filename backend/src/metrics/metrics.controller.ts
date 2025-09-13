import {
  Controller,
  Get,
  Header,
  Req,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";

import { Public } from "../auth/public.decorator";

import { MetricsService } from "./metrics.service";

@Controller("metrics")
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get()
  @Public()
  @Header("Content-Type", "text/plain; version=0.0.4")
  async getMetrics(@Req() req: Request) {
    const allowListRaw = process.env.METRICS_IP_ALLOWLIST || "";
    if (allowListRaw) {
      const allow = allowListRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const ip = (req.ip || req.socket.remoteAddress || "").replace(
        "::ffff:",
        "",
      );
      if (!allow.includes(ip)) {
        throw new ForbiddenException("IP not allowed");
      }
    }
    return this.metrics.getRegistry().metrics();
  }
}
