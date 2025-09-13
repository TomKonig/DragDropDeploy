import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../app.module";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword } from "../../test/random-password";

describe("Build Executor (flag) e2e", () => {
  // Extended timeout: build execution path can take >5s on cold start (Prisma + module init)
  jest.setTimeout(30000);
  let app: INestApplication;

  beforeAll(async () => {
    delete process.env.REDIS_URL; // force in-memory path for deterministic test
    process.env.BUILD_EXECUTION_ENABLED = "true";
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    registerTestApp(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it("runs executor and records executor markers in logs", async () => {
    const email = `exec_${Date.now()}@example.com`;

    // Helper to perform register with limited retries (handles rare transient 500 during cold start)
    const doRegister = async () => {
      let lastErr: unknown;
      for (let i = 0; i < 3; i++) {
        const res = await request(app.getHttpServer())
          .post("/auth/register")
          .send({ email, password: randomPassword(), name: "Exec User" });
        if (res.status === 201) return res;
        lastErr = res.body || res.text;
        await new Promise((r) => setTimeout(r, 150 * (i + 1)));
      }
      throw new Error(
        "register failed after retries: " + JSON.stringify(lastErr),
      );
    };

    const register = await doRegister();
    const token = register.body.accessToken;

    const project = await request(app.getHttpServer())
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Executor Project" })
      .expect(201);
    const projectId = project.body.id;

    const build = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    const buildId = build.body.id;

    // Poll with jitter + capture intermediate statuses for diagnostics
    const start = Date.now();
    let status = build.body.status;
    const timeline: Array<{ t: number; status: string }> = [{ t: 0, status }];
    let attempt = 0;
    while (
      status !== "SUCCESS" &&
      status !== "FAILED" &&
      Date.now() - start < 30000
    ) {
      const delay = Math.min(250 + attempt * 100, 1750);
      await new Promise((r) => setTimeout(r, delay));
      attempt++;
      const latest = await request(app.getHttpServer())
        .get(`/builds/${buildId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      status = latest.body.status;
      timeline.push({ t: Date.now() - start, status });
    }

    if (!["SUCCESS", "FAILED"].includes(status)) {
      // Fetch logs even on timeout for better diagnostics
      const logsAttempt = await request(app.getHttpServer())
        .get(`/builds/${buildId}/logs`)
        .set("Authorization", `Bearer ${token}`);
      // Use throw to surface detailed info
      throw new Error(
        `build did not complete in time; last status=${status}; timeline=${JSON.stringify(
          timeline,
        )}; logsPreview=${String(logsAttempt.body?.logs || "").slice(0, 400)}`,
      );
    }
    expect(["SUCCESS", "FAILED"]).toContain(status);

    const logs = await request(app.getHttpServer())
      .get(`/builds/${buildId}/logs`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const content: string = logs.body.logs || "";
    expect(content).toContain("executor: enabled - starting real build");
    expect(content).toMatch(/executor: result/);

    // Provide extra assertion that closing markers appear in order if success
    if (status === "SUCCESS") {
      const idxStart = content.indexOf(
        "executor: enabled - starting real build",
      );
      const idxResult = content.search(/executor: result/);
      expect(idxResult).toBeGreaterThan(idxStart);
    }
  });
});
