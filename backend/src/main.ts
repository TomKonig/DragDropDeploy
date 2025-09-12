import "reflect-metadata";
import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cors from "cors";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { i18n } from "./i18n/i18n.service";
import { pluginManager } from "./plugins/plugin-manager";
import { PrismaService } from "./prisma/prisma.service";

import "./plugins/register-plugins";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set");
  }
  // Graceful shutdown with Prisma
  const prismaService = app.get(PrismaService);
  if (prismaService?.enableShutdownHooks) {
    prismaService.enableShutdownHooks(app);
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Security headers
  app.use(helmet());
  // CORS configuration (CORS_ORIGINS env comma separated). If empty, allow all for now.
  const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin: allowedOrigins.length ? allowedOrigins : true,
      credentials: true,
    }),
  );
  // Rate limiting now registered via middleware consumer (see AppModule or dedicated module)
  // Load translations early
  i18n.load();
  // Initialize registered plugins (registration happens in AppModule or separate bootstrap file)
  await pluginManager.initAll();

  // Swagger / OpenAPI (guarded by simple env flag if desired later)
  const swaggerConfig = new DocumentBuilder()
    .setTitle("DragDropDeploy API")
    .setDescription("API documentation for DragDropDeploy platform")
    .setVersion(process.env.npm_package_version || "0.0.1")
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDoc, {
    swaggerOptions: { persistAuthorization: true },
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`API listening on :${port}`, "Bootstrap");
}
void bootstrap().catch((err) => {
  // Normalize unknown error to Error instance for safe stack access
  const normalized: Error = err instanceof Error ? err : new Error(String(err));
  Logger.error("Bootstrap failure", normalized.stack ?? normalized.message);
  // eslint-disable-next-line no-process-exit -- intentional hard exit on unrecoverable bootstrap failure
  process.exit(1);
});
