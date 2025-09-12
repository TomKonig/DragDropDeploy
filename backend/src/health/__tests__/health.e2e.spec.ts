import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { registerTestApp } from '../../test/app-tracker';
import { randomPassword, randomEmail } from '../../test/random-password';
import { PrismaService } from '../../prisma/prisma.service';

async function register(app: INestApplication, email: string = randomEmail()) {
  const password = randomPassword();
  const res = await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password });
  // Debug: log status for registration
  // eslint-disable-next-line no-console
  console.log('[health.e2e] register response', res.status, res.body?.role);
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
    registerTestApp(app);
  // Clean in dependency order: deployments -> buildJobs -> projectSetting -> projects -> users
  await (prisma as any).deployment.deleteMany();
  await (prisma as any).buildJob.deleteMany();
  await (prisma as any).projectSetting.deleteMany();
  await (prisma as any).project.deleteMany();
  await (prisma as any).user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
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
    // Debug: attempt request and log intermediate response
    const res = await request(app.getHttpServer())
      .get('/health/internal')
      .set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-console
    console.log('[health.e2e] /health/internal status', res.status, res.body);
    expect(res.status).toBe(403);
  }, 15000); // increase timeout to 15s for diagnostics
});
