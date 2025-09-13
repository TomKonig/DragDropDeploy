import * as crypto from "crypto";

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingOperator = await prisma.user.findFirst({
    where: { isOperator: true },
  });
  if (existingOperator) {
    // eslint-disable-next-line no-console -- single informational message for idempotent seed
    console.log("Operator already exists; no action.");
    return;
  }

  const provided = process.env.OPERATOR_BOOTSTRAP_PASSWORD;
  const generated = !provided
    ? crypto.randomBytes(18).toString("base64url")
    : undefined; // ~144 bits entropy
  const bootstrapPassword = provided || generated!;
  const hash = await bcrypt.hash(bootstrapPassword, 12);
  const user = await prisma.user.create({
    data: {
      email: process.env.OPERATOR_BOOTSTRAP_EMAIL || "operator@example.com",
      isOperator: true,
      passwordHash: hash,
      role: "OPERATOR",
      displayName: "Bootstrap Operator",
    },
  });
  if (generated) {
    // eslint-disable-next-line no-console -- operational output guides secure handling of generated password
    console.log(
      `Seeded operator user ${user.email} (role=OPERATOR) with GENERATED one-time password (value suppressed; see secure channel).`,
    );
    // eslint-disable-next-line no-console -- follow-up guidance
    console.log(
      "Store this securely and change it immediately via the profile/settings flow.",
    );
  } else {
    // eslint-disable-next-line no-console -- operational info for provided password path
    console.log(
      `Seeded operator user ${user.email} (role=OPERATOR) with provided OPERATOR_BOOTSTRAP_PASSWORD env value.`,
    );
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
