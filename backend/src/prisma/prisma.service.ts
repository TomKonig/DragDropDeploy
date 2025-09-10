import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getTenantUser } from './tenant-context';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
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

