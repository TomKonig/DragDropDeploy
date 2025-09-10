import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';

describe('Build Queue (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let projectId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    prisma = app.get(PrismaService);

    const email = `builder_${Date.now()}@example.com`;
    const reg = await request(app.getHttpServer()).post('/auth/register').send({ email, password: 'Password123!' });
    token = reg.body.accessToken;
    const proj = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Build Test' });
    projectId = proj.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('queues (simulates) a build and creates SUCCESS job', async () => {
    const res = await request(app.getHttpServer())
      .post(`/builds/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res.status).toBe(201); // POST default
    expect(res.body.queued).toBe(true);
    // Poll until job reaches SUCCESS (max ~1s)
    const start = Date.now();
    let job;
    while (Date.now() - start < 1000) {
      job = await (prisma as any).buildJob.findFirst({ where: { projectId }, orderBy: { createdAt: 'desc' } });
      if (job && job.status === 'SUCCESS') break;
      await new Promise(r => setTimeout(r, 50));
    }
    expect(job).toBeTruthy();
    expect(job.status).toBe('SUCCESS');
  });
});
