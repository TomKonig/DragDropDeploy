import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { registerTestApp } from '../../test/app-tracker';
import { PrismaService } from '../../prisma/prisma.service';

describe('Build history & concurrency (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
  await app.init();
  registerTestApp(app);
  });

  afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
  });

  async function registerAndAuth(email: string) {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: 'Password123!', displayName: 'Test' })
      .expect(201);
  // Auth service returns { accessToken, tokenType, expiresIn }
  return res.body.accessToken;
  }

  it('creates sequential versions and prevents parallel active builds', async () => {
    const token = await registerAndAuth(`user_build_hist_${Date.now()}@example.com`);
    const projRes = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'BuildProj', domain: `buildproj-${Date.now()}.local` })
      .expect(201);
    const projectId = projRes.body.id;

    // First build enqueue
    const b1 = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    expect(b1.body).toHaveProperty('id');

    // Second enqueue while first still in progress should return same active or queued build id (concurrency gate)
    const b2 = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    expect(b2.body.id).toBe(b1.body.id); // concurrency gate returns same active build

    // Wait for lifecycle to finish
  await new Promise(r => { const t = setTimeout(r, 160); if (typeof (t as any).unref === 'function') (t as any).unref(); });

    // Enqueue second build after first completes
    const b3 = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    expect(b3.body.id).not.toBe(b1.body.id);

    // Fetch project build history
    const history = await request(app.getHttpServer())
      .get(`/builds/project/${projectId}?limit=5`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(history.body.length).toBeGreaterThanOrEqual(2);
    // Versions should be descending in createdAt order; verify version increment monotonic if versions present
    const versions = history.body.map((b: any) => b.version).filter((v: number | null) => v != null);
    for (let i = 1; i < versions.length; i++) {
      expect(versions[i - 1]).toBeGreaterThanOrEqual(versions[i]);
    }
  });
});
