import { randomUUID } from "crypto";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Deployment } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { getTenantUser } from "../prisma/tenant-context";

type DeploymentStatus =
  | "PENDING"
  | "BUILDING"
  | "ACTIVE"
  | "INACTIVE"
  | "FAILED";
const STATUS: Record<DeploymentStatus, DeploymentStatus> = {
  PENDING: "PENDING",
  BUILDING: "BUILDING",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  FAILED: "FAILED",
};

@Injectable()
export class DeploymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPending(projectId: string): Promise<Deployment> {
    if (!projectId) throw new BadRequestException("projectId required");
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException("Project not found");
    const userId = getTenantUser();
    return this.prisma.deployment.create({
      data: { projectId, userId: userId || undefined },
    });
  }

  /**
   * Persist a staged (temp) directory produced by the upload extraction into the artifacts root
   * and create a pending deployment that references it.
   */
  async createWithArtifact(
    projectId: string,
    stagedPath: string,
  ): Promise<Deployment> {
    if (!stagedPath) throw new BadRequestException("stagedPath required");
    // Require projectId format similar to other endpoints for early rejection
    if (!/^c[a-z0-9]{24,}$/i.test(projectId)) {
      throw new BadRequestException("Invalid projectId");
    }
    // Enforce that stagedPath must originate from our controlled temp staging prefix to reduce TOCTOU and path injection risk.
    const tmpPrefix = path.resolve(os.tmpdir());
    // Normalize and ensure stagedPath is an existing directory produced by our extraction logic.
    const stagedReal = path.resolve(stagedPath);
    if (!stagedReal.startsWith(tmpPrefix + path.sep)) {
      throw new BadRequestException("stagedPath outside allowed temp root");
    }
    let stagedStat: fs.Stats;
    try {
      stagedStat = await fs.promises.stat(stagedReal);
    } catch {
      throw new BadRequestException("Invalid stagedPath");
    }
    if (!stagedStat.isDirectory())
      throw new BadRequestException("stagedPath must be a directory");
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException("Project not found");
    const userId = getTenantUser();
    const artifactsRoot = path.resolve(
      process.env.ARTIFACTS_DIR || "./artifacts",
    );
    await fs.promises.mkdir(artifactsRoot, { recursive: true });
    const destDir = path.join(artifactsRoot, `${projectId}-${randomUUID()}`);
    const destReal = path.resolve(destDir);
    // Ensure destination remains inside artifactsRoot (defense-in-depth against path manipulation).
    if (!destReal.startsWith(artifactsRoot + path.sep)) {
      throw new BadRequestException("Artifact destination resolution error");
    }
    await fs.promises.mkdir(destDir, { recursive: true });
    // shallow recursive copy
    await this.copyDirSafe(stagedReal, destReal, artifactsRoot);
    // Create deployment then a build job; wrap in transaction for consistency
    return this.prisma.$transaction(async (tx) => {
      // BuildJob has its own status enum in Prisma; assign literal directly.
      await tx.buildJob.create({ data: { projectId, status: "PENDING" } });
      return tx.deployment.create({
        data: {
          projectId,
          userId: userId || undefined,
          artifactPath: destDir,
          status: STATUS.BUILDING,
        },
      });
    });
  }

  private async copyDirSafe(
    src: string,
    dest: string,
    root: string,
  ): Promise<void> {
    const entries = await fs.promises.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      // Prevent copying unexpected hidden parent references even if present post-extraction.
      if (entry.name === "." || entry.name === "..") continue;
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      const destReal = path.resolve(destPath);
      if (!destReal.startsWith(root + path.sep)) {
        throw new BadRequestException(
          "Path traversal detected during artifact copy",
        );
      }
      if (entry.isDirectory()) {
        await fs.promises.mkdir(destPath, { recursive: true });
        await this.copyDirSafe(srcPath, destPath, root);
      } else if (entry.isFile()) {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  }

  /** Activate a deployment after successful build. Marks previous ACTIVE deployments INACTIVE (same project) and updates symlink. */
  async activateDeployment(
    deploymentId: string,
  ): Promise<{ id: string; activePath: string }> {
    const deployment = await this.prisma.deployment.findUnique({
      where: { id: deploymentId },
    });
    if (!deployment) throw new NotFoundException("Deployment not found");
    if (!deployment.artifactPath)
      throw new BadRequestException("Deployment missing artifactPath");
    const artifactsRoot = path.resolve(
      process.env.ARTIFACTS_DIR || "./artifacts",
    );
    const artifactReal = path.resolve(deployment.artifactPath);
    if (!artifactReal.startsWith(artifactsRoot + path.sep))
      throw new BadRequestException("Artifact path outside root");
    // Symlink path: <artifactsRoot>/<projectId>-active
    const symlinkPath = path.join(
      artifactsRoot,
      `${deployment.projectId}-active`,
    );
    // Update statuses in a transaction
    await this.prisma.$transaction(async (tx) => {
      await tx.deployment.updateMany({
        where: { projectId: deployment.projectId, status: STATUS.ACTIVE },
        data: { status: STATUS.INACTIVE },
      });
      await tx.deployment.update({
        where: { id: deployment.id },
        data: { status: STATUS.ACTIVE },
      });
    });
    // Create/update symlink (atomic replace)
    try {
      await fs.promises.unlink(symlinkPath).catch(() => {});
      await fs.promises.symlink(artifactReal, symlinkPath, "dir");
    } catch {
      // Roll back status if symlink fails
      await this.prisma.deployment
        .update({
          where: { id: deployment.id },
          data: { status: STATUS.FAILED },
        })
        .catch(() => {});
      throw new BadRequestException("Failed to activate deployment");
    }
    return { id: deployment.id, activePath: symlinkPath };
  }

  async getActiveArtifactPath(projectId: string): Promise<string | null> {
    // Enforce same projectId pattern used elsewhere to prevent crafted path components.
    if (!/^c[a-z0-9]{24,}$/i.test(projectId)) return null;
    const artifactsRoot = path.resolve(
      process.env.ARTIFACTS_DIR || "./artifacts",
    );
    // Construct the symlink path in a safe manner: resolve(root, component) so that any path separators in projectId (already rejected) cannot escape root.
    const symlinkPath = path.resolve(artifactsRoot, `${projectId}-active`);
    // Ensure symlink path itself did not traverse (defense-in-depth even though pattern restricts input)
    if (!symlinkPath.startsWith(artifactsRoot + path.sep)) return null;
    try {
      const real = await fs.promises.realpath(symlinkPath);
      if (!real.startsWith(artifactsRoot + path.sep)) return null;
      return real;
    } catch {
      return null;
    }
  }

  async rollback(
    projectId: string,
    targetDeploymentId?: string,
  ): Promise<{ id: string; activePath: string }> {
    // Choose target: explicit or most recent INACTIVE (by createdAt desc)
    const target = targetDeploymentId
      ? await this.prisma.deployment.findFirst({
          where: { id: targetDeploymentId, projectId },
        })
      : await this.prisma.deployment.findFirst({
          where: { projectId, status: STATUS.INACTIVE },
          orderBy: { createdAt: "desc" },
        });
    if (!target) throw new NotFoundException("No rollback candidate");
    return this.activateDeployment(target.id);
  }
}
