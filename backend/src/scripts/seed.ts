import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const existingOperator = await prisma.user.findFirst({ where: { isOperator: true } });
  if (existingOperator) {
    console.log('Operator already exists; no action.');
    return;
  }

  const provided = process.env.OPERATOR_BOOTSTRAP_PASSWORD;
  const generated = !provided ? crypto.randomBytes(18).toString('base64url') : undefined; // ~144 bits entropy
  const bootstrapPassword = provided || generated!;
  const hash = await bcrypt.hash(bootstrapPassword, 12);
  const user = await prisma.user.create({
    data: {
      email: process.env.OPERATOR_BOOTSTRAP_EMAIL || 'operator@example.com',
      isOperator: true,
      passwordHash: hash,
      role: 'OPERATOR',
      displayName: 'Bootstrap Operator'
    }
  });
  if (generated) {
    console.log(`Seeded operator user ${user.email} (role=OPERATOR) with GENERATED one-time password: ${bootstrapPassword}`);
    console.log('Store this securely and change it immediately via the profile/settings flow.');
  } else {
    console.log(`Seeded operator user ${user.email} (role=OPERATOR) with provided OPERATOR_BOOTSTRAP_PASSWORD env value.`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
