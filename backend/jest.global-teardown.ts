import { closeAllTestApps } from './src/test/app-tracker';

export default async () => {
  try { await closeAllTestApps(true); } catch {}
  const ctx = (global as any).__TESTCONTAINERS__;
  if (ctx?.container) {
    try { await ctx.container.stop({ timeout: 1000 }); } catch {}
  }
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  } catch {}
};
