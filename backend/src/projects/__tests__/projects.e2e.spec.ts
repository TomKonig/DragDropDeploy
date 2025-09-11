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
  return { token: res.body.accessToken, password };
}

describe('Projects CRUD (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    prisma = app.get(PrismaService);
  await app.init();
  registerTestApp(app);
  // Clean dependent relations first to avoid FK constraint errors
  await prisma.deployment.deleteMany();
  await prisma.buildJob.deleteMany();
  await prisma.projectSetting.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('creates lists updates and deletes a project', async () => {
  const { token } = await register(app);

    const created = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Project' })
      .expect(201);

    const projectId = created.body.id;
    expect(projectId).toBeDefined();

    const list = await request(app.getHttpServer())
      .get('/projects')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list.body.length).toBe(1);

    await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' })
      .expect(200);

    await request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const listAfter = await request(app.getHttpServer())
      .get('/projects')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(listAfter.body.length).toBe(0);
  });

  it('prevents cross-user project access', async () => {
  const { token: tokenA } = await register(app);
  const { token: tokenB } = await register(app);

    const createdA = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ name: 'A Project' })
      .expect(201);

    const projectId = createdA.body.id;

    // User B attempts to read
    await request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(404);

    // User B attempts to update
    await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ name: 'Hack' })
      .expect(403);
  });
});
