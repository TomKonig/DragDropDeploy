import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../app.module";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword } from "../../test/random-password";

describe("Build Logs (in-memory) e2e", () => {
  let app: INestApplication;

  beforeAll(async () => {
    delete process.env.REDIS_URL; // force in-memory path
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

  it("creates a build and returns log content", async () => {
    const email = `logs_${Date.now()}@example.com`;
    const register = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password: randomPassword(), name: "Logs User" })
      .expect(201);
    const token = register.body.accessToken;

    const project = await request(app.getHttpServer())
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Logs Project" })
      .expect(201);
    const projectId = project.body.id;

    const build = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    const buildId = build.body.id;

    // Poll until SUCCESS or timeout
    const start = Date.now();
    let status = build.body.status;
    while (status !== "SUCCESS" && Date.now() - start < 5000) {
      await new Promise((r) => setTimeout(r, 150));
      const latest = await request(app.getHttpServer())
        .get(`/builds/${buildId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      status = latest.body.status;
    }
    expect(status).toBe("SUCCESS");

    const logs = await request(app.getHttpServer())
      .get(`/builds/${buildId}/logs`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(logs.body.logs).toContain("status: RUNNING");
    expect(logs.body.logs).toContain("status: SUCCESS");
  });
});
