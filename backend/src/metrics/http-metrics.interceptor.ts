import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

import { MetricsService } from "./metrics.service";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context
      .switchToHttp()
      .getRequest<{
        method?: string;
        route?: { path?: string };
        originalUrl?: string;
      }>();
    const method = req?.method || "UNKNOWN";
    const route: string = req?.route?.path || req?.originalUrl || "unknown";
    return next.handle().pipe(
      tap({
        next: () => this.record(method, route, context),
        error: () => this.record(method, route, context),
      }),
    );
  }
  private record(method: string, route: string, context: ExecutionContext) {
    const res = context.switchToHttp().getResponse<{ statusCode?: number }>();
    const status = res?.statusCode ?? 0;
    this.metrics.httpRequestCounter.inc({
      method,
      route,
      status: String(status),
    });
  }
}
