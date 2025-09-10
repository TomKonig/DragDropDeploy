import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cors from 'cors';
import { RateLimitMiddleware } from './auth/rate-limit.middleware';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { i18n } from './i18n/i18n.service';
import { pluginManager } from './plugins/plugin-manager';
import './plugins/register-plugins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  // Graceful shutdown with Prisma
  const prismaService = app.get(PrismaService);
  if (prismaService?.enableShutdownHooks) {
    await prismaService.enableShutdownHooks(app);
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Security headers
  app.use(helmet());
  // CORS configuration (CORS_ORIGINS env comma separated). If empty, allow all for now.
  const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
  app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
  // Rate limit only /auth/login endpoint for deterministic test and prod behavior
  const rateLimiter = new RateLimitMiddleware();
  app.use('/auth/login', rateLimiter.use.bind(rateLimiter));
  // Load translations early
  i18n.load();
  // Initialize registered plugins (registration happens in AppModule or separate bootstrap file)
  await pluginManager.initAll();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
