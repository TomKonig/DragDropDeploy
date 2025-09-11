import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getTenantUser } from '../prisma/tenant-context';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class DeploymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPending(projectId: string) {
    if (!projectId) throw new BadRequestException('projectId required');
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    const userId = getTenantUser();
    return this.prisma.deployment.create({ data: { projectId, userId: userId || undefined } });
  }

  /**
   * Persist a staged (temp) directory produced by the upload extraction into the artifacts root
   * and create a pending deployment that references it.
   */
  async createWithArtifact(projectId: string, stagedPath: string) {
    if (!stagedPath) throw new BadRequestException('stagedPath required');
    // Normalize and ensure stagedPath is an existing directory produced by our extraction logic.
    const stagedReal = path.resolve(stagedPath);
    let stagedStat: fs.Stats;
    try {
      stagedStat = await fs.promises.stat(stagedReal);
    } catch {
      throw new BadRequestException('Invalid stagedPath');
    }
    if (!stagedStat.isDirectory()) throw new BadRequestException('stagedPath must be a directory');
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');
    const userId = getTenantUser();
    const artifactsRoot = path.resolve(process.env.ARTIFACTS_DIR || './artifacts');
    await fs.promises.mkdir(artifactsRoot, { recursive: true });
    const destDir = path.join(artifactsRoot, `${projectId}-${randomUUID()}`);
    const destReal = path.resolve(destDir);
    // Ensure destination remains inside artifactsRoot (defense-in-depth against path manipulation).
    if (!destReal.startsWith(artifactsRoot + path.sep)) {
      throw new BadRequestException('Artifact destination resolution error');
    }
    await fs.promises.mkdir(destDir, { recursive: true });
    // shallow recursive copy
    await this.copyDirSafe(stagedReal, destReal, artifactsRoot);
    // Create deployment then a build job; wrap in transaction for consistency
    return this.prisma.$transaction(async tx => {
      const deployment = await tx.deployment.create({ data: { projectId, userId: userId || undefined, artifactPath: destDir, status: 'BUILDING' as any } });
      await tx.buildJob.create({ data: { projectId, status: 'PENDING' } });
      return deployment;
    });
  }

  private async copyDirSafe(src: string, dest: string, root: string) {
    const entries = await fs.promises.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      // Prevent copying unexpected hidden parent references even if present post-extraction.
      if (entry.name === '.' || entry.name === '..') continue;
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      const destReal = path.resolve(destPath);
      if (!destReal.startsWith(root + path.sep)) {
        throw new BadRequestException('Path traversal detected during artifact copy');
      }
      if (entry.isDirectory()) {
        await fs.promises.mkdir(destPath, { recursive: true });
        await this.copyDirSafe(srcPath, destPath, root);
      } else if (entry.isFile()) {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  }
}
