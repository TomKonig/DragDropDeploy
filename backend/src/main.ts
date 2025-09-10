import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Graceful shutdown with Prisma
  const prismaService = app.get(PrismaService);
  if (prismaService?.enableShutdownHooks) {
    await prismaService.enableShutdownHooks(app);
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
