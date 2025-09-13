import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";

// jsonwebtoken has no default export; use namespace import
import * as jwt from "jsonwebtoken";
import request from "supertest";

import { AppModule } from "../../app.module";
import { PrismaService } from "../../prisma/prisma.service";
import { registerTestApp } from "../../test/app-tracker";
import { randomPassword, randomEmail } from "../../test/random-password";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  afterEach(() => {
    if (process.env.JWT_VERIFICATION_SECRETS) {
      delete process.env.JWT_VERIFICATION_SECRETS;
    }
    if (process.env.JWT_SIGNING_SECRET && process.env.JWT_SECRET) {
      delete process.env.JWT_SIGNING_SECRET;
    } else if (process.env.JWT_SIGNING_SECRET && !process.env.JWT_SECRET) {
      process.env.JWT_SECRET = process.env.JWT_SIGNING_SECRET;
      delete process.env.JWT_SIGNING_SECRET;
    }
    // Ensure test-specific operator bootstrap email does not leak between tests
    if (process.env.OPERATOR_BOOTSTRAP_EMAIL) {
      delete process.env.OPERATOR_BOOTSTRAP_EMAIL;
    }
  });

  it("promotes first user to operator role", async () => {
    const email = randomEmail("bootstrap.test");
    // Force operator promotion even if other test suites have already created users
    process.env.OPERATOR_BOOTSTRAP_EMAIL = email;
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
    // Perform failing attempts until capacity exceeded
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email, password: "wrong-" + i })
        .expect(401);
      await sleep(5); // small delay for counter propagation
    }
    // Try up to 3 times to observe the 429 (in case of timing jitter)
    let got429 = false;
    for (let attempt = 0; attempt < 3 && !got429; attempt++) {
      const res = await request(app.getHttpServer())
        .post("/auth/login")
        .send({ email, password: "wrong-final" });
      if (res.status === 429) {
        got429 = true;
        if (!res.headers["retry-after"]) {
          throw new Error(
            "Expected Retry-After header on 429 rate limit response",
          );
        }
      } else if (res.status !== 401) {
        throw new Error(
          `Unexpected status ${res.status} during rate limit test`,
        );
      }
      if (!got429) await sleep(10);
    }
    expect(got429).toBe(true);
  });

  it("protects /status endpoint with role guard", async () => {
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
    const oldSecret =
      process.env.JWT_SIGNING_SECRET ||
      process.env.JWT_SECRET ||
      "oldsecret_fallback";
    const newSecret = oldSecret + "_rotated";
    process.env.JWT_SIGNING_SECRET = newSecret;
    process.env.JWT_VERIFICATION_SECRETS = `${newSecret},${oldSecret}`;
    const email = randomEmail("rotate.test");
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password })
      .expect(201);
    const decoded = jwt.decode(reg.body.accessToken);
    const payload: Record<string, any> =
      decoded && typeof decoded === "object" ? { ...decoded } : {};
    delete (payload as any).exp;
    delete (payload as any).iat;
    const legacyToken = jwt.sign(payload, oldSecret, { expiresIn: "5m" });
    await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${legacyToken}`)
      .expect(200);
  });
});
