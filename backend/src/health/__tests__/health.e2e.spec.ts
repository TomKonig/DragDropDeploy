import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { randomPassword } from '../../test/random-password';
import { PrismaService } from '../../prisma/prisma.service';

async function register(app: INestApplication, email: string) {
  const password = randomPassword();
  const res = await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password });
  return res.body.accessToken as string;
}

describe('Health endpoints (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    prisma = app.get(PrismaService);
    await app.init();
  // Clean in dependency order: deployments -> projects -> users
  await (prisma as any).deployment.deleteMany();
  await (prisma as any).project.deleteMany();
  await (prisma as any).user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 for public /health', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns 401 for /health/internal without token', async () => {
    await request(app.getHttpServer()).get('/health/internal').expect(401);
  });

  it('returns 403 for /health/internal with basic user token', async () => {
  // Ensure first user (operator bootstrap) is created so the next user is plain USER
  await register(app, 'health-bootstrap-op@example.com');
  const token = await register(app, 'healthuser@example.com');
    await request(app.getHttpServer())
      .get('/health/internal')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });
});
