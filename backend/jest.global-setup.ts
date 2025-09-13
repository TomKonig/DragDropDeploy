import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import { Client } from "pg";

let container: StartedTestContainer | undefined;

async function startEphemeralPostgres(): Promise<string | undefined> {
  try {
    const c = await new GenericContainer("postgres:15")
      .withEnvironment({
        POSTGRES_PASSWORD: "postgres",
        POSTGRES_USER: "postgres",
        POSTGRES_DB: "dragdropdeploy_test",
      })
      .withExposedPorts(5432)
      .withWaitStrategy(
        Wait.forLogMessage("database system is ready to accept connections"),
      )
      .start();
    container = c;
    const host = c.getHost();
    const port = c.getMappedPort(5432);
    return `postgresql://postgres:postgres@${host}:${port}/dragdropdeploy_test`;
  } catch (err) {
    // Swallow error here; we'll fallback to requiring DATABASE_URL
    console.warn(
      "[jest.global-setup] Failed to start testcontainers Postgres, falling back to external DATABASE_URL. Reason:",
      (err as any)?.message,
    );
    return undefined;
  }
}

async function waitForPostgres(
  databaseUrl: string,
  attempts = 30,
  delayMs = 500,
): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    try {
      const client = new Client({ connectionString: databaseUrl });
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      return; // success
    } catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

export default async () => {
  // Prefer existing DATABASE_URL (CI), else attempt ephemeral
  if (!process.env.DATABASE_URL) {
    const url = await startEphemeralPostgres();
    if (url) {
      process.env.DATABASE_URL = url;
    } else if (!process.env.DATABASE_URL) {
      throw new Error(
        "No DATABASE_URL provided and unable to start ephemeral Postgres. Set DATABASE_URL for tests.",
      );
    }
  }

  // Ensure DB reachable before running migrations
  await waitForPostgres(process.env.DATABASE_URL!);

  process.env.JWT_SECRET = process.env.JWT_SECRET || "testsecret_testsecret";
  process.env.JWT_EXPIRES_IN = "15m";
  process.env.NODE_ENV = "test";

  (global as any).__TESTCONTAINERS__ = { container };

  const { default: execa } = await import("execa");
  try {
    await execa("npx", ["prisma", "migrate", "deploy"], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  } catch (e) {
    await execa("npx", ["prisma", "db", "push", "--accept-data-loss"], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }

  // Centralized clean slate for all e2e suites (replaces per-suite deleteMany blocks)
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const { resetDatabase } = await import("./src/test/reset-db");
    await resetDatabase(prisma as any);
    await prisma.$disconnect();
  } catch (err) {
    console.warn(
      "[jest.global-setup] resetDatabase failed (continuing):",
      (err as any)?.message,
    );
  }
};
