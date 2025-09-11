import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getTenantUser } from './tenant-context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  async onModuleDestroy() {
    // Ensure we release the PG pool when Nest shuts down.
    await this.$disconnect().catch(() => {/* ignore */});
  }

  // Placeholder for future RLS session variable usage.
  async setTenantContext() {
    if (process.env.RLS_ENABLED === 'true') {
      const user = getTenantUser();
      if (user) {
        // Future: execute raw to set PostgreSQL local setting, e.g.:
        // await this.$executeRawUnsafe('SET LOCAL app.user_id = $1', user);
      }
    }
  }
}

