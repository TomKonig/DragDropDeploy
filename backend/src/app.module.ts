import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantInterceptor } from './prisma/tenant.interceptor';
import { HttpMetricsInterceptor } from './metrics/http-metrics.interceptor';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/validation';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { UploadsModule } from './uploads/uploads.module';
import { StatusModule } from './status/status.module';
import { LoggerModule } from 'nestjs-pino';
import { RateLimitMiddleware } from './auth/rate-limit.middleware';
import { BuildModule } from './build/build.module';
import { DeploymentsModule } from './deployments/deployments.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true, validationSchema: configValidationSchema, validationOptions: { context: { docGen: process.env.SKIP_DB_CONNECT_FOR_DOCS === '1' } } }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty', options: { colorize: true } },
        redact: ['req.headers.authorization'],
      },
    }),
    AuthModule, // load auth (global guards) early
    HealthModule,
    PrismaModule,
    UsersModule,
    ProjectsModule,
    UploadsModule,
  StatusModule,
  BuildModule,
  DeploymentsModule,
  MetricsModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
