import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";

interface Bucket {
  tokens: number;
  lastRefill: number;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private buckets = new Map<string, Bucket>();
  private capacity = Number(process.env.RATE_LIMIT_AUTH_CAPACITY || 5); // attempts
  private windowMs = Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS || 60_000); // per minute

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = (
      (req.headers["x-forwarded-for"] as string) ||
      req.ip ||
      "unknown"
    )
      .split(",")[0]
      .trim();
    const bodyEmail =
      typeof req.body === "object" && req.body && "email" in req.body
        ? (req.body as Record<string, unknown>).email
        : "";
    const email = typeof bodyEmail === "string" ? bodyEmail : "";
    const key = `${ip}:${email}`;
    const now = Date.now();
    const bucket = this.buckets.get(key) || {
      tokens: this.capacity,
      lastRefill: now,
    };
    // Refill
    const elapsed = now - bucket.lastRefill;
    if (elapsed > this.windowMs) {
      bucket.tokens = this.capacity;
      bucket.lastRefill = now;
    }
    bucket.tokens -= 1;
    if (bucket.tokens < 0) {
      bucket.tokens = 0; // clamp
      this.buckets.set(key, bucket);
      throw new HttpException(
        "Rate limit exceeded",
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    this.buckets.set(key, bucket);
    return true;
  }
}
