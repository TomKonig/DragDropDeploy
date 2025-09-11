import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface Bucket {
  tokens: number;
  lastRefill: number;
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private buckets = new Map<string, Bucket>();
  private capacity = Number(process.env.RATE_LIMIT_AUTH_CAPACITY || 5); // attempts
  private windowMs = Number(process.env.RATE_LIMIT_AUTH_WINDOW_MS || 60_000); // interval length
  // Stale bucket TTL (same as window) and periodic cleanup handle unbounded growth risk
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Periodically prune buckets that have not been touched for > 2 * window (generous grace)
    const interval = Math.max(30_000, Math.min(5 * 60_000, this.windowMs));
    // Store interval handle so we could clear it if dispose() is called; unref to avoid keeping event loop alive.
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const ttl = this.windowMs * 2;
      for (const [key, bucket] of this.buckets.entries()) {
        if (now - bucket.lastRefill > ttl) {
          this.buckets.delete(key);
        }
      }
    }, interval) as any;
    (this.cleanupInterval as any)?.unref?.();
  }

  // Allow graceful shutdown to clear timer (Nest calls onModuleDestroy for providers, but middleware isn't automatically)
  public dispose() {
    clearInterval(this.cleanupInterval);
  }

  use(req: Request, res: Response, next: NextFunction) {
  // Apply only to auth login attempts (registration excluded so tests count only failed logins)
    if (!req.path.startsWith('/auth/login')) {
      return next();
    }
    const ip = ((req.headers['x-forwarded-for'] as string) || req.ip || 'unknown').split(',')[0].trim();
    // Use email if present for login attempts, else just IP (for abuse resistance and test determinism)
  const emailRaw = (req.body?.email || '').toString().toLowerCase();
  const key = `${ip}:${emailRaw}`;
    const now = Date.now();
  const bucket = this.buckets.get(key) || { tokens: this.capacity, lastRefill: now };
    // Refill
    const elapsed = now - bucket.lastRefill;
    if (elapsed > this.windowMs) {
      bucket.tokens = this.capacity;
      bucket.lastRefill = now;
    }
    // Add a custom header only during tests for visibility
    if (process.env.NODE_ENV === 'test') {
      res.setHeader('X-RateLimit-Test', `${key}:${bucket.tokens}`);
    }
    bucket.tokens -= 1;
    if (bucket.tokens < 0) {
      bucket.tokens = 0; // clamp
      const retryAfterSec = Math.ceil(this.windowMs / 1000);
      if (!res.getHeader('Retry-After')) {
        res.setHeader('Retry-After', `${retryAfterSec}`);
      }
      res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Rate limit exceeded'
      });
      return; // do not call next()
    }
  this.buckets.set(key, bucket);
    next();
  }
}
