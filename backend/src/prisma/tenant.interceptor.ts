import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tenantStorage } from './tenant-context';

// TenantInterceptor establishes a per-request AsyncLocalStorage context storing the
// authenticated user id. This avoids passing userId through every service method
// and prepares for future Postgres RLS integration. When ENABLE_RLS is activated
// and policies are in place, an early DB hook/transaction wrapper will SET LOCAL
// a custom variable (e.g. app.user_id) from this context so policies can enforce
// row ownership (SELECT/INSERT/UPDATE/DELETE). Until then, this is a lightweight
// convenience layer with no security effect by itself.

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const userId: string | undefined = req?.user?.sub;
    return tenantStorage.run({ userId }, () => next.handle());
  }
}
