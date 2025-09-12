import { MinifyService } from '../minify.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

describe('MinifyService', () => {
  const artifactsRoot = path.join(__dirname, 'tmp-artifacts');
  const projectId = 'proj1';
  const projectDir = path.join(artifactsRoot, projectId);
  let svc: MinifyService;

  beforeAll(() => {
    process.env.ARTIFACTS_DIR = artifactsRoot;
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'a.js'), 'function test() { // comment\n  console.log( 1 + 2 );\n}\n');
    fs.writeFileSync(path.join(projectDir, 'style.css'), 'body {  color: red; /* c */  }');
    fs.writeFileSync(path.join(projectDir, 'index.html'), '<html>  <body>  <h1> Title </h1> </body> </html>');
    fs.writeFileSync(path.join(projectDir, 'already.min.js'), 'console.log(1);');
    // Provide a minimal prisma mock satisfying the methods used in MinifyService
    const prismaMock = {
      projectSetting: {
        findUnique: jest.fn().mockResolvedValue(null)
      }
    } as unknown as PrismaService;
    svc = new MinifyService(prismaMock);
  });
  afterAll(() => {
    fs.rmSync(artifactsRoot, { recursive: true, force: true });
  });

  it('minifies eligible files and skips .min.js', async () => {
    const logs: string[] = [];
    await svc.maybeMinifyProject(projectId, l => logs.push(l));
    const js = fs.readFileSync(path.join(projectDir, 'a.js'),'utf8');
    expect(js).not.toMatch(/comment/);
    const skipped = logs.find(l => l.includes('skipped='));
    expect(skipped).toBeDefined();
    expect(fs.readFileSync(path.join(projectDir,'already.min.js'),'utf8')).toContain('console.log');
  });
});
