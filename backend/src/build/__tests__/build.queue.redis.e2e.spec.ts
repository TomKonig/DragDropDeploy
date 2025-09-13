import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { StartedTestContainer, GenericContainer, Wait } from "testcontainers";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword } from "../../test/random-password";
import { BuildQueueService } from "../build.queue";

// This test spins up a real Redis container and asserts BullMQ path works.
// Skips if Docker not available or CI explicitly disables with NO_DOCKER.

describe("Build Queue (BullMQ Redis) e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let redis: StartedTestContainer | null = null;
  const timeoutMs = 20000;
  jest.setTimeout(timeoutMs);

  beforeAll(async () => {
    if (process.env.NO_DOCKER) {
      return; // skip container startup
    }
    try {
      redis = await new GenericContainer("redis:7-alpine")
        .withExposedPorts(6379)
        .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
        .start();
      const host = redis.getHost();
      const port = redis.getMappedPort(6379);
      process.env.REDIS_URL = `redis://${host}:${port}`;
      // Allow BullMQ usage inside test environment explicitly
      process.env.ALLOW_REDIS_IN_TEST = "1";
    } catch (e) {
      // If Redis can't start, skip suite (likely no Docker)
      console.warn("Redis container unavailable, skipping BullMQ test:", e);
      return;
    }

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    registerTestApp(app);
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    if (app) {
      // Ensure queue teardown runs
      const svc = app.get(BuildQueueService);
      await svc.onModuleDestroy();
      await app.close();
      await prisma.$disconnect();
    }
    if (redis) await redis.stop();
    delete process.env.REDIS_URL; // avoid leaking into subsequent tests
    delete process.env.ALLOW_REDIS_IN_TEST;
  });

  // Ensure REDIS_URL doesn't persist if a test early-exits or jest bails mid-suite.
  afterEach(() => {
    // When running full suite we want later tests to default to in-memory path.
    if (process.env.REDIS_URL) delete process.env.REDIS_URL;
  });

  it("enqueues a build and reaches SUCCESS via BullMQ worker", async () => {
    if (!redis) {
      return; // skipped
    }
    // Register user
    const email = `redisq_${Date.now()}@example.com`;
    const register = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password: randomPassword(), name: "Redis User" })
      .expect(201);
    const token = register.body.accessToken;

    // Create project
    const projectRes = await request(app.getHttpServer())
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Redis Queue Project" })
      .expect(201);
    const projectId = projectRes.body.id;

    // Trigger build
    const buildRes = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    const buildId = buildRes.body.id;

    // Poll for SUCCESS
    const start = Date.now();
    let status = buildRes.body.status;
    while (status !== "SUCCESS" && Date.now() - start < 8000) {
      await new Promise((r) => {
        const t = setTimeout(r, 400);
        if (typeof (t as any).unref === "function") (t as any).unref();
      });
      const latest = await request(app.getHttpServer())
        .get(`/builds/${buildId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      status = latest.body.status;
      if (["FAILED", "CANCELLED"].includes(status)) {
        throw new Error(`Build moved to terminal failure state: ${status}`);
      }
    }
    expect(status).toBe("SUCCESS");
  });
});
