import * as fs from "fs";
import * as path from "path";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

import { AppModule } from "../../../src/app.module";

// This test exercises minification toggle logic by simulating build executor runBuild in disabled(simulation) mode.

describe("Build Minify Toggle (e2e)", () => {
  let app: INestApplication;
  // prisma not required directly in this test
  let token: string;
  let projectId: string;
  const artifactsRoot = path.join(process.cwd(), "artifacts");
  const logsDir = path.join(process.cwd(), "logs-test");
  const logFile = path.join(logsDir, "minify.log");

  beforeAll(async () => {
    process.env.ARTIFACTS_DIR = artifactsRoot;
    process.env.BUILD_EXECUTION_ENABLED = "false";
    fs.mkdirSync(logsDir, { recursive: true });
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    const email = "mini2@example.com";
    const password = "Passw0rd!test";
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(201);
    // Auth service returns camelCase accessToken (not snake_case)
    token = login.body.accessToken;
    const proj = await request(app.getHttpServer())
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "p-min" })
      .expect(201);
    projectId = proj.body.id;
  });

  afterAll(async () => {
    await app.close();
    fs.rmSync(artifactsRoot, { recursive: true, force: true });
    fs.rmSync(logsDir, { recursive: true, force: true });
  });

  async function seedArtifact(htmlWhitespace: boolean) {
    const projDir = path.join(artifactsRoot, projectId);
    fs.mkdirSync(projDir, { recursive: true });
    const html = htmlWhitespace
      ? "<html>   <body>  <h1> Title </h1> </body></html>"
      : "<html><body><h1>Title</h1></body></html>";
    fs.writeFileSync(path.join(projDir, "index.html"), html, "utf8");
  }

  function readArtifact(): string {
    return fs.readFileSync(
      path.join(artifactsRoot, projectId, "index.html"),
      "utf8",
    );
  }

  it("minifies by default (project optOutMinify=false)", async () => {
    await seedArtifact(true);
    // run build executor directly
    const { BuildExecutorService } = await import("../../build/build.executor");
    const exec = app.get(BuildExecutorService);
    await exec.runBuild(projectId, logFile);
    const after = readArtifact();
    expect(after).toContain("<html>");
    expect(after).not.toMatch(/ {2}<h1>/); // whitespace collapsed
  });

  it("skips when project opts out", async () => {
    await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ optOutMinify: true })
      .expect(200);
    await seedArtifact(true);
    const { BuildExecutorService } = await import("../../build/build.executor");
    const exec = app.get(BuildExecutorService);
    await exec.runBuild(projectId, logFile);
    const after = readArtifact();
    expect(after).toMatch(/ {2}<h1>/); // whitespace left intact
  });

  it("FORCE_MINIFY=1 overrides optOut", async () => {
    // Ensure project is opted OUT so that FORCE_MINIFY actually proves override
    await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ optOutMinify: true })
      .expect(200);
    process.env.FORCE_MINIFY = "1";
    // Seed artifact with whitespace so minifier has work to do
    await seedArtifact(true);
    const { BuildExecutorService } = await import("../../build/build.executor");
    const exec = app.get(BuildExecutorService);
    await exec.runBuild(projectId, logFile);
    const after = readArtifact();
    expect(after).not.toMatch(/ {2}<h1>/);
    process.env.FORCE_MINIFY = undefined; // cleanup
  });
});
