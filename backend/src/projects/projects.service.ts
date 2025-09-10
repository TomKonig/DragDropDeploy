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
		return this.prisma.project.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' } });
	}

	async findOneOwned(userId: string, id: string) {
		const project = await this.prisma.project.findFirst({ where: { id, ownerId: userId } });
		if (!project) throw new NotFoundException('Project not found');
		return project;
	}

		async update(userId: string, id: string, data: { name?: string; domain?: string }) {
		const existing = await this.prisma.project.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Project not found');
		if (existing.ownerId !== userId) throw new ForbiddenException('Not owner');
			try {
				return await this.prisma.project.update({ where: { id }, data: { ...data, domain: data.domain?.toLowerCase() } });
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
