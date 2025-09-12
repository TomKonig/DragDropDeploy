import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from './metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method: string = req.method;
    // route path may not be resolved yet; fallback to originalUrl
    const route: string = req.route?.path || req.originalUrl || 'unknown';
    const start = process.hrtime.bigint();
    return next.handle().pipe(
      tap({
        next: () => this.record(req, method, route, context),
        error: () => this.record(req, method, route, context),
      })
    );
  }
  private record(req: any, method: string, route: string, context: ExecutionContext) {
    const res = context.switchToHttp().getResponse();
    const status = res.statusCode || 0;
    this.metrics.httpRequestCounter.inc({ method, route, status: String(status) });
  }
}
