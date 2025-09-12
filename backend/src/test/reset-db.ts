import { PrismaClient } from '@prisma/client';

/**
 * Truncate (deleteMany) all mutable tables to provide a clean slate between e2e test suites.
 * Order matters due to foreign key constraints.
 * Use cautiously; intended only for test environment.
 */
export async function resetDatabase(prisma: PrismaClient) {
  // Child tables first
  await prisma.deployment.deleteMany();
  await prisma.buildJob.deleteMany();
  await prisma.projectSetting.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  await prisma.systemSetting.deleteMany();
}

export default resetDatabase;
