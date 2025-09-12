import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) {}

		async create(ownerId: string, name: string, domain?: string) {
			try {
				return await this.prisma.project.create({ data: { ownerId, name, domain: domain?.toLowerCase() } });
			} catch (e: any) {
				if (e.code === 'P2002' && e.meta?.target?.includes('domain')) {
					throw new BadRequestException('Domain already in use');
				}
				throw e;
			}
	}

	async findAllForUser(userId: string) {
		return this.prisma.project.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' }, include: { settings: true } });
	}

	async findOneOwned(userId: string, id: string) {
		const project = await this.prisma.project.findFirst({ where: { id, ownerId: userId }, include: { settings: true } });
		if (!project) throw new NotFoundException('Project not found');
		return project;
	}

			async update(userId: string, id: string, data: { name?: string; domain?: string; optOutMinify?: boolean; buildFlags?: string[] }) {
		const existing = await this.prisma.project.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Project not found');
		if (existing.ownerId !== userId) throw new ForbiddenException('Not owner');
			try {
						const { optOutMinify, buildFlags, ...rest } = data;
				const updated = await this.prisma.project.update({ where: { id }, data: { ...rest, domain: rest.domain?.toLowerCase() } });
				if (typeof optOutMinify === 'boolean') {
					await this.prisma.projectSetting.upsert({
						where: { projectId: id },
						update: { optOutMinify },
						create: { projectId: id, optOutMinify }
					});
				}
						if (buildFlags) {
							const allowEnv = process.env.BUILD_FLAGS_ALLOWLIST || '';
							const allow = allowEnv.split(',').map(f => f.trim()).filter(Boolean);
							const invalid = allow.length ? buildFlags.filter(f => !allow.includes(f.split('=')[0])) : [];
							if (invalid.length) throw new BadRequestException(`Invalid build flags: ${invalid.join(', ')}`);
							// Use any cast to accommodate potential lag in generated Prisma client types after recent schema change
							await (this.prisma.projectSetting as any).upsert({
								where: { projectId: id },
								update: { buildFlags } as any,
								create: { projectId: id, buildFlags } as any
							});
						}
				return this.findOneOwned(userId, id);
			} catch (e: any) {
				if (e.code === 'P2002' && e.meta?.target?.includes('domain')) {
					throw new BadRequestException('Domain already in use');
				}
				throw e;
			}
	}

	async remove(userId: string, id: string) {
		const existing = await this.prisma.project.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Project not found');
		if (existing.ownerId !== userId) throw new ForbiddenException('Not owner');
		await this.prisma.project.delete({ where: { id } });
		return { deleted: true };
	}
}
