import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

// Narrowly typed guard for Prisma unique constraint violation on project.domain
// Avoids importing Prisma error classes to keep coupling low.
function isPrismaDomainUniqueError(e: unknown): boolean {
  if (!e || typeof e !== "object") return false;
  // Using indexed access with runtime checks to stay type-safe without 'any'
  const maybe = e as { code?: unknown; meta?: { target?: unknown } };
  if (maybe.code !== "P2002") return false;
  if (!Array.isArray(maybe.meta?.target)) return false;
  return (maybe.meta.target as unknown[]).includes("domain");
}

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger("ProjectsService");
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, name: string, domain?: string) {
    try {
      const created = await this.prisma.project.create({
        data: { ownerId, name, domain: domain?.toLowerCase() },
      });
      return created;
    } catch (e) {
      if (isPrismaDomainUniqueError(e)) {
        throw new BadRequestException("Domain already in use");
      }
      this.logger.error(
        "Project create failed",
        e instanceof Error ? e.message : String(e),
      );
      throw e;
    }
  }

  async findAllForUser(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      include: { settings: true },
    });
  }

  async findOneOwned(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
      include: { settings: true },
    });
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  async update(
    userId: string,
    id: string,
    data: {
      name?: string;
      domain?: string;
      optOutMinify?: boolean;
      buildFlags?: string[];
    },
  ) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Project not found");
    if (existing.ownerId !== userId) throw new ForbiddenException("Not owner");
    try {
      const { optOutMinify, buildFlags, ...rest } = data;
      await this.prisma.project.update({
        where: { id },
        data: { ...rest, domain: rest.domain?.toLowerCase() },
      });
      if (typeof optOutMinify === "boolean") {
        await this.prisma.projectSetting.upsert({
          where: { projectId: id },
          update: { optOutMinify },
          create: { projectId: id, optOutMinify },
        });
      }
      if (buildFlags) {
        const allowEnv = process.env.BUILD_FLAGS_ALLOWLIST || "";
        const allow = allowEnv
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
        const invalid = allow.length
          ? buildFlags.filter((f) => !allow.includes(f.split("=")[0]))
          : [];
        if (invalid.length)
          throw new BadRequestException(
            `Invalid build flags: ${invalid.join(", ")}`,
          );
        await this.prisma.projectSetting.upsert({
          where: { projectId: id },
          update: { buildFlags },
          create: { projectId: id, buildFlags },
        });
      }
      return this.findOneOwned(userId, id);
    } catch (e) {
      if (isPrismaDomainUniqueError(e)) {
        throw new BadRequestException("Domain already in use");
      }
      throw e;
    }
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Project not found");
    if (existing.ownerId !== userId) throw new ForbiddenException("Not owner");
    await this.prisma.project.delete({ where: { id } });
    return { deleted: true };
  }
}
