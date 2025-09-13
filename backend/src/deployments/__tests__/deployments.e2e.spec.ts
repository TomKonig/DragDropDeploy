import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import JSZip from "jszip";
import request from "supertest";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";

async function makeZip(files: Record<string, string>): Promise<Buffer> {
  const zip = new JSZip();
  for (const [p, content] of Object.entries(files)) zip.file(p, content);
  return zip.generateAsync({ type: "nodebuffer" });
}

describe("Deployments end-to-end", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deploy v1 then v2 then rollback to v1 (auth)", async () => {
    // Use a unique email each run to avoid cross-test collisions or prior script leftovers
    const email = `d_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@d.dev`;
    const password = "Passw0rd!test";
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(201);
    const token = login.body.accessToken;
    const prisma = app.get(PrismaService);
    const user = await prisma.user.findUnique({ where: { email } });
    const project = await prisma.project.create({
      data: { name: "Demo", ownerId: user!.id },
    });

    // Build first archive
    const zip1 = await makeZip({ "index.html": "<h1>Version1</h1>" });
    const res1 = await request(app.getHttpServer())
      .post("/deployments/upload")
      .set("Authorization", `Bearer ${token}`)
      .field("projectId", project.id)
      .attach("file", zip1, { filename: "v1.zip" })
      .expect(201);
    expect(res1.body.deploymentId).toBeTruthy();

    // Activate manually (simulating build success) since we bypass build queue in this focused test
    await request(app.getHttpServer())
      .post(`/deployments/${res1.body.deploymentId}/activate`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    // Serve file
    const serve1 = await request(app.getHttpServer())
      .get(`/deployments/project/${project.id}/site/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(serve1.text).toContain("Version1");

    const zip2 = await makeZip({ "index.html": "<h1>Version2</h1>" });
    const res2 = await request(app.getHttpServer())
      .post("/deployments/upload")
      .set("Authorization", `Bearer ${token}`)
      .field("projectId", project.id)
      .attach("file", zip2, { filename: "v2.zip" })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/deployments/${res2.body.deploymentId}/activate`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    const serve2 = await request(app.getHttpServer())
      .get(`/deployments/project/${project.id}/site/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(serve2.text).toContain("Version2");

    // Rollback (should pick previous inactive)
    await request(app.getHttpServer())
      .post(`/deployments/project/${project.id}/rollback`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
    const serveRollback = await request(app.getHttpServer())
      .get(`/deployments/project/${project.id}/site/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(serveRollback.text).toContain("Version1");
  });
});
