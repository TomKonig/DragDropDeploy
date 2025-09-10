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

  use(req: Request, res: Response, next: NextFunction) {
    // Apply only to auth login attempts (registration excluded so tests count only failed logins)
    if (!req.path.startsWith('/auth/login')) {
      return next();
    }
    const ip = ((req.headers['x-forwarded-for'] as string) || req.ip || 'unknown').split(',')[0].trim();
    // Use email if present for login attempts, else just IP (for abuse resistance and test determinism)
    const email = req.body?.email || '';
    const key = `${ip}:${email}`;
    const now = Date.now();
    const bucket = this.buckets.get(key) || { tokens: this.capacity, lastRefill: now };
    // Refill
    const elapsed = now - bucket.lastRefill;
    if (elapsed > this.windowMs) {
      bucket.tokens = this.capacity;
      bucket.lastRefill = now;
    }
  // Add a custom header for test visibility
  res.setHeader('X-RateLimit-Test', `${key}:${bucket.tokens}`);
  const before = bucket.tokens;
  bucket.tokens -= 1;
  const after = bucket.tokens;
    if (bucket.tokens < 0) {
      bucket.tokens = 0; // clamp
      return next(new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS));
    }
    this.buckets.set(key, bucket);
    next();
  }
}
