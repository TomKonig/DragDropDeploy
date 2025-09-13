import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { randomEmail, randomPassword } from "../../test/random-password";

/**
 * Focused branch coverage tests for DeploymentsController edge cases.
 * Targets low-coverage branches: invalid id/projectId validation, no active deployment 404 path.
 */
describe("DeploymentsController branch edges", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let projectId: string;

  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
    const email = randomEmail("deploy-branches");
    const password = randomPassword();
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(201);
    token = login.body.accessToken;
    const user = await prisma.user.findUnique({ where: { email } });
    const project = await prisma.project.create({
      data: { name: "BranchProj", ownerId: user!.id },
    });
    projectId = project.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("rejects invalid deployment id on activate", async () => {
    await request(app.getHttpServer())
      .post("/deployments/not-a-real-id/activate")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  it("rejects invalid projectId on rollback", async () => {
    await request(app.getHttpServer())
      .post("/deployments/project/invalidProjectId/rollback")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  it("returns 404 on serve with no active deployment", async () => {
    await request(app.getHttpServer())
      .get(`/deployments/project/${projectId}/site/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});
