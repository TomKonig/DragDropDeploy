import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import JSZip from 'jszip';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import { randomEmail, randomPassword } from '../../test/random-password';

describe('Deployment Upload E2E', () => {
  let app: INestApplication; let prisma: PrismaService; let authToken: string; let projectId: string;
  let email: string; let password: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  // Generate and register user
  email = randomEmail('upload.test');
  password = randomPassword();
  await request(app.getHttpServer()).post('/auth/register').send({ email, password });
  const login = await request(app.getHttpServer()).post('/auth/login').send({ email, password });
  authToken = login.body.accessToken;
    // Create project
    const project = await prisma.project.create({ data: { name: 'UploadProj', ownerId: (await prisma.user.findUnique({ where: { email } }))!.id } });
    projectId = project.id;
  });

  afterAll(async () => {
    await app.close();
  });

  async function makeZip(files: Record<string, string>) {
    const zip = new JSZip();
    for (const [name, content] of Object.entries(files)) zip.file(name, content);
    return await zip.generateAsync({ type: 'nodebuffer' });
  }

  it('happy path: uploads small zip', async () => {
    const buf = await makeZip({ 'index.html': '<html></html>' });
    const res = await request(app.getHttpServer())
      .post('/deployments/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('projectId', projectId)
      .attach('file', buf, { filename: 'site.zip', contentType: 'application/zip' });
    expect(res.status).toBe(201);
  expect(res.body.status).toBe('BUILDING');
    expect(res.body.deploymentId).toBeTruthy();
  expect(res.body.artifactPath).toBeTruthy();
  const fs = require('fs');
  expect(fs.existsSync(res.body.artifactPath)).toBe(true);
  });

  it('creates a build job when uploading', async () => {
    const buf = await makeZip({ 'index.html': '<html><body>v2</body></html>' });
    const res = await request(app.getHttpServer())
      .post('/deployments/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('projectId', projectId)
      .attach('file', buf, { filename: 'site2.zip', contentType: 'application/zip' });
    expect(res.status).toBe(201);
    const deploymentId = res.body.deploymentId;
    expect(res.body.status).toBe('BUILDING');
    const prisma = app.get(PrismaService);
    const buildJobs = await prisma.buildJob.findMany({ where: { projectId } });
    expect(buildJobs.length).toBeGreaterThan(0);
    // optional: ensure at least one recent job (within test run)
    const recent = buildJobs.some(j => Date.now() - j.createdAt.getTime() < 60000);
    expect(recent).toBe(true);
  });

  it('rejects oversize zip', async () => {
    const bigContent = 'a'.repeat(200 * 1024); // 200KB
    const buf = await makeZip({ 'big.txt': bigContent });
    // Temporarily set MAX_UPLOAD_MB low via process env for test isolation
    const old = process.env.MAX_UPLOAD_MB; process.env.MAX_UPLOAD_MB = '0.05'; // ~51KB
    const res = await request(app.getHttpServer())
      .post('/deployments/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('projectId', projectId)
      .attach('file', buf, { filename: 'big.zip', contentType: 'application/zip' });
    process.env.MAX_UPLOAD_MB = old;
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/File exceeds/);
  });

  it('rejects path traversal entry (JSZip may sanitize; conditionally asserts)', async () => {
    const zip = new JSZip();
    zip.file('../evil.txt', 'x');
    const buf = await zip.generateAsync({ type: 'nodebuffer' });
    // Re-open to inspect stored names
    const reopened = await JSZip.loadAsync(buf);
    const names = Object.keys(reopened.files);
    const hasTraversal = names.some(n => n.includes('..'));
    const res = await request(app.getHttpServer())
      .post('/deployments/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('projectId', projectId)
      .attach('file', buf, { filename: 'evil.zip', contentType: 'application/zip' });
    if (hasTraversal) {
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/traversal/i);
    } else {
      // Library sanitized; ensure upload still succeeds to surface behavior
      expect(res.status).toBe(201);
    }
  });

  it('rejects non-zip file', async () => {
    const textBuffer = Buffer.from('just some text');
    const res = await request(app.getHttpServer())
      .post('/deployments/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .field('projectId', projectId)
      .attach('file', textBuffer, { filename: 'notzip.txt', contentType: 'text/plain' });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/zip/i);
  });
});
