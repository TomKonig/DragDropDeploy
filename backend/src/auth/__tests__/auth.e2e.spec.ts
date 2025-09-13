import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
// jsonwebtoken has no default export; use namespace import
import * as jwt from "jsonwebtoken";
import request from "supertest";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword, randomEmail } from "../../test/random-password";

describe("Auth & Roles (e2e)", () => {
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
    // Global clean for deterministic first-user promotion; truncate key tables
    await prisma.deployment.deleteMany();
    await prisma.project.deleteMany();
    await prisma.buildJob.deleteMany();
    await prisma.projectSetting.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  // Ensure mutations to JWT secrets in rotation test do not leak to other
  // suites (which assume initial secret state). This mirrors a realistic
  // process restart boundary between independent test files.
  afterEach(() => {
    if (process.env.JWT_VERIFICATION_SECRETS) {
      delete process.env.JWT_VERIFICATION_SECRETS;
    }
    if (process.env.JWT_SIGNING_SECRET && process.env.JWT_SECRET) {
      // If both are defined we preserve JWT_SECRET (validated by config) and
      // clear the override JWT_SIGNING_SECRET used only for rotation test.
      delete process.env.JWT_SIGNING_SECRET;
    } else if (process.env.JWT_SIGNING_SECRET && !process.env.JWT_SECRET) {
      // If only signing secret was set (unlikely in normal path), keep one stable value.
      process.env.JWT_SECRET = process.env.JWT_SIGNING_SECRET;
      delete process.env.JWT_SIGNING_SECRET;
    }
  });

  it("promotes first user to operator role", async () => {
    const email = randomEmail("bootstrap.test");
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;
    const me = await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(me.body.role).toBe("OPERATOR");
    expect(me.body.isOperator).toBe(true);
  });

  it("registers a user and logs in", async () => {
    const email = randomEmail();
    const password = randomPassword();

    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    expect(reg.body.accessToken).toBeDefined();

    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(201);
    expect(login.body.accessToken).toBeDefined();
  });

  it("second user is plain USER role", async () => {
    const email2 = randomEmail("bootstrap.test");
    const password2 = randomPassword();
    const reg2 = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: email2, password: password2 })
      .expect(201);
    const token2 = reg2.body.accessToken;
    const me2 = await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${token2}`)
      .expect(200);
    expect(me2.body.role).toBe("USER");
  });

  it("rate limits excessive login attempts", async () => {
    const email = randomEmail("test.example");
    const password = randomPassword();
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    // 6 failing attempts should exceed default capacity=5
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email, password: "wrong-" + i })
        .expect(401);
    }
    // This one should trigger 429
    const limitRes = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: "wrong-final" })
      .expect(429);
    expect(limitRes.status).toBe(429);
    // Retry-After header should exist; if absent fail with diagnostic
    if (!limitRes.headers["retry-after"]) {
      throw new Error("Expected Retry-After header on 429 rate limit response");
    }
  });

  it("protects /status endpoint with role guard", async () => {
    // plain user should not access
    const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;
    await request(app.getHttpServer())
      .get("/status")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
  });

  it("blocks protected internal health without role", async () => {
    // new basic user
    const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;

    await request(app.getHttpServer())
      .get("/health/internal")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
  });

  it("returns current user profile via /auth/me", async () => {
    const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;

    const meRes = await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(meRes.body.email).toBe(email);
    expect(meRes.body.id).toBeDefined();
    expect(meRes.body.passwordHash).toBeUndefined();
    expect(meRes.body.role).toBeDefined();
  });

  it("accepts tokens signed with previous secret when rotated", async () => {
    // Simulate rotation: set signing secret to new, verification includes old
    const oldSecret =
      process.env.JWT_SIGNING_SECRET ||
      process.env.JWT_SECRET ||
      "oldsecret_fallback";
    const newSecret = oldSecret + "_rotated";
    process.env.JWT_SIGNING_SECRET = newSecret;
    process.env.JWT_VERIFICATION_SECRETS = `${newSecret},${oldSecret}`;
    // Reinitialize JwtModule would require rebuilding app; instead manually sign using old secret to ensure strategy accepts
    const email = randomEmail("rotate.test");
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    // registration token signed with NEW secret, now craft a token with OLD secret to test backward verification
    const decoded = jwt.decode(reg.body.accessToken);
    const payload: Record<string, any> =
      decoded && typeof decoded === "object" ? { ...decoded } : {};
    // Remove existing exp to avoid jwt.sign option conflict
    delete (payload as any).exp;
    delete (payload as any).iat;
    const legacyToken = jwt.sign(payload, oldSecret, { expiresIn: "5m" });
    await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${legacyToken}`)
      .expect(200);
  });
});
