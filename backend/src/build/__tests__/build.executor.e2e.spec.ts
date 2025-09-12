import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { registerTestApp } from '../../test/app-tracker';
import { randomPassword } from '../../test/random-password';

describe('Build Executor (flag) e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    delete process.env.REDIS_URL; // force in-memory path for deterministic test
    process.env.BUILD_EXECUTION_ENABLED = 'true';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    registerTestApp(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('runs executor and records executor markers in logs', async () => {
    const email = `exec_${Date.now()}@example.com`;
    const register = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: randomPassword(), name: 'Exec User' })
      .expect(201);
    const token = register.body.accessToken;

    const project = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Executor Project' })
      .expect(201);
    const projectId = project.body.id;

    const build = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
    const buildId = build.body.id;

    const start = Date.now();
    let status = build.body.status;
    let attempt = 0;
    let lastError: any;
    while (status !== 'SUCCESS' && status !== 'FAILED' && Date.now() - start < 20000) {
      await new Promise(r => setTimeout(r, 150 + attempt * 50));
      attempt++;
      try {
        const latest = await request(app.getHttpServer())
          .get(`/builds/${buildId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
        status = latest.body.status;
      } catch (e) {
        // Intermittent 404 (job row not yet committed / read skew); retry until timeout
        lastError = e;
      }
    }
    expect(['SUCCESS', 'FAILED']).toContain(status);

    const logs = await request(app.getHttpServer())
      .get(`/builds/${buildId}/logs`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(logs.body.logs).toContain('executor: enabled - starting real build');
    expect(logs.body.logs).toMatch(/executor: result/);
  });
});
