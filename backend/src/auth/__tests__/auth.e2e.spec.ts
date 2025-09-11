import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { registerTestApp } from '../../test/app-tracker';
import { randomPassword, randomEmail } from '../../test/random-password';
import { PrismaService } from '../../prisma/prisma.service';

describe('Auth & Roles (e2e)', () => {
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
  // Clean in dependency order to avoid foreign key violations
  await (prisma as any).deployment.deleteMany();
  await (prisma as any).project.deleteMany();
  await (prisma as any).user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('registers a user and logs in', async () => {
  const email = randomEmail();
  const password = randomPassword();

    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);

    expect(reg.body.accessToken).toBeDefined();

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    expect(login.body.accessToken).toBeDefined();
  });

  it('promotes first user to operator role', async () => {
    // Reset DB to ensure first user scenario
  await (prisma as any).deployment.deleteMany();
  await (prisma as any).project.deleteMany();
  await (prisma as any).user.deleteMany();
  const email = randomEmail('bootstrap.test');
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;
    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(me.body.role).toBe('OPERATOR');
    expect(me.body.isOperator).toBe(true);
  });

  it('second user is plain USER role', async () => {
  const email2 = randomEmail('bootstrap.test');
    const password2 = randomPassword();
    const reg2 = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: email2, password: password2 })
      .expect(201);
    const token2 = reg2.body.accessToken;
    const me2 = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token2}`)
      .expect(200);
    expect(me2.body.role).toBe('USER');
  });

  it('rate limits excessive login attempts', async () => {
  const email = randomEmail('test.example');
    const password = randomPassword();
    await request(app.getHttpServer()).post('/auth/register').send({ email, password }).expect(201);
    // 6 failing attempts should exceed default capacity=5
    for (let i = 0; i < 5; i++) {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password: 'wrong-' + i })
        .expect(401);
    }
    // This one should trigger 429
    const limitRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'wrong-final' })
      .expect(429);
    expect(limitRes.status).toBe(429);
    // Retry-After header should exist; if absent fail with diagnostic
    if (!limitRes.headers['retry-after']) {
      throw new Error('Expected Retry-After header on 429 rate limit response');
    }
  });

  it('protects /status endpoint with role guard', async () => {
    // plain user should not access
  const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;
    await request(app.getHttpServer())
      .get('/status')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });

  it('blocks protected internal health without role', async () => {
    // new basic user
  const email = randomEmail();
  const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;

    await request(app.getHttpServer())
      .get('/health/internal')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });

  it('returns current user profile via /auth/me', async () => {
  const email = randomEmail();
    const password = randomPassword();
    const reg = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password })
      .expect(201);
    const token = reg.body.accessToken;

    const meRes = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(meRes.body.email).toBe(email);
    expect(meRes.body.id).toBeDefined();
    expect(meRes.body.passwordHash).toBeUndefined();
    expect(meRes.body.role).toBeDefined();
  });
});
