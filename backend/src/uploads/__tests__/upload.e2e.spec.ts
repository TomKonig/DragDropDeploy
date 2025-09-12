import fs from "fs";
import os from "os";
import path from "path";

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword, randomEmail } from "../../test/random-password";

function tempFile(content: string) {
  const p = path.join(
    os.tmpdir(),
    `upload-test-${Date.now()}-${Math.random()}.txt`,
  );
  fs.writeFileSync(p, content, "utf8");
  return p;
}

describe("Uploads -> Deployment creation (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    prisma = app.get(PrismaService);
    await app.init();
    registerTestApp(app);
    await prisma.deployment.deleteMany();
    await prisma.buildJob.deleteMany();
    await prisma.projectSetting.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("creates a deployment record with PENDING status on upload", async () => {
    const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;

    const project = await request(app.getHttpServer())
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "UploadProject" })
      .expect(201);

    const filePath = tempFile("hello world");

    const uploadRes = await request(app.getHttpServer())
      .post(`/uploads/project/${project.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", filePath)
      .expect(201);

    expect(uploadRes.body.deploymentId).toBeDefined();
    expect(uploadRes.body.status).toBe("PENDING");

    const deployment = await prisma.deployment.findUnique({
      where: { id: uploadRes.body.deploymentId },
    });
    expect(deployment).toBeTruthy();
    expect(deployment?.projectId).toBe(project.body.id);
  });
});
