import { Controller, Get } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';

@Controller('health')
export class HealthController {
  // Public basic liveness endpoint
  @Public()
  @Get()
  public() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  // Internal detailed endpoint restricted to operators/admins
  @Get('internal')
  @Roles('OPERATOR', 'ADMIN')
  internal() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      memory: process.memoryUsage(),
    };
  }
}
