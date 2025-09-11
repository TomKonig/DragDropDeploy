import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { randomPassword } from '../../test/random-password';
import { registerTestApp } from '../../test/app-tracker';
import { PrismaService } from '../../prisma/prisma.service';

describe('Project Domain Validation (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.init();
  registerTestApp(app);
    prisma = app.get(PrismaService);

    // register a user
    const email = `user_${Date.now()}@example.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: randomPassword() });
  authToken = res.body.accessToken;
  });

  afterAll(async () => {
  // Close Nest app first to stop incoming requests, then disconnect Prisma explicitly
  await app.close();
  await prisma.$disconnect();
  });

  it('rejects invalid domain format', async () => {
    const res = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Bad Domain Project', domain: 'invalid_domain_@@' });
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Invalid domain format');
  });

  it('accepts valid domain and lowercases it', async () => {
    const res = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Good Domain Project', domain: 'Example-Domain.COM' });
    expect(res.status).toBe(201);
    expect(res.body.domain).toBe('example-domain.com');
  });

  it('rejects duplicate domain', async () => {
    // create first project with domain
    const domain = `dup${Date.now()}.example.com`;
    const first = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'First', domain });
    expect(first.status).toBe(201);
    expect(first.body).toBeTruthy();

    const second = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Second', domain });
    expect(second.status).toBe(400);
    expect(second.body.message).toBe('Domain already in use');
  });
});
