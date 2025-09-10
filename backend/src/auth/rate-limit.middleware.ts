import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface Bucket {
  tokens: number;
  lastRefill: number;
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private buckets = new Map<string, Bucket>();
  private capacity = Number(process.env.RATE_LIMIT_AUTH_CAPACITY || 5); // attempts
  private windowMs = Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS || 60_000); // per minute

  use(req: Request, _res: Response, next: NextFunction) {
    // Apply only to auth register/login
    if (!req.path.startsWith('/auth/login') && !req.path.startsWith('/auth/register')) {
      return next();
    }
  const ip = ((req.headers['x-forwarded-for'] as string) || req.ip || 'unknown').split(',')[0].trim();
    const now = Date.now();
    const bucket = this.buckets.get(ip) || { tokens: this.capacity, lastRefill: now };
    // Refill
    const elapsed = now - bucket.lastRefill;
    if (elapsed > this.windowMs) {
      bucket.tokens = this.capacity;
      bucket.lastRefill = now;
    }
    if (bucket.tokens <= 0) {
  throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }
    bucket.tokens -= 1;
    this.buckets.set(ip, bucket);
    next();
  }
}
