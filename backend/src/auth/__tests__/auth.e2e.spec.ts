import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { randomPassword } from '../../test/random-password';
import { PrismaService } from '../../prisma/prisma.service';

describe('Auth & Roles (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
    process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/testdb';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    prisma = app.get(PrismaService);

    await app.init();
  // Clean in dependency order to avoid foreign key violations
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers a user and logs in', async () => {
    const email = 'user@example.com';
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

  it('blocks protected internal health without role', async () => {
    // new basic user
    const email = 'plain@example.com';
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
    const email = 'meuser@example.com';
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
