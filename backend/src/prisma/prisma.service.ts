import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { getTenantUser } from "./tenant-context";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    if (process.env.SKIP_DB_CONNECT_FOR_DOCS === "1") {
      return; // skip DB initialization for documentation generation
    }
    try {
      await this.$connect();
    } catch (e) {
      if (process.env.FAIL_ON_DB_CONNECT === "1") throw e; // allow hard fail when explicitly requested
      // swallow error to allow partial app bootstrap for non-DB docs tasks
    }
  }

  enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", () => {
      void app.close();
    });
  }

  async onModuleDestroy() {
    // Ensure we release the PG pool when Nest shuts down.
    await this.$disconnect().catch(() => {
      /* ignore */
    });
  }

  // Reserved spot for future RLS session variable usage.
  setTenantContext() {
    if (process.env.RLS_ENABLED === "true") {
      const user = getTenantUser();
      if (user) {
        // Future: execute raw to set PostgreSQL local setting, e.g.:
        // await this.$executeRawUnsafe('SET LOCAL app.user_id = $1', user);
      }
    }
  }
}
