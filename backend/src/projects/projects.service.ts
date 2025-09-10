import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) {}

		async create(ownerId: string, name: string) {
			return this.prisma.project.create({ data: { ownerId, name } });
	}

	async findAllForUser(userId: string) {
		return this.prisma.project.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' } });
	}

	async findOneOwned(userId: string, id: string) {
		const project = await this.prisma.project.findFirst({ where: { id, ownerId: userId } });
		if (!project) throw new NotFoundException('Project not found');
		return project;
	}

		async update(userId: string, id: string, data: { name?: string }) {
		const existing = await this.prisma.project.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Project not found');
		if (existing.ownerId !== userId) throw new ForbiddenException('Not owner');
		return this.prisma.project.update({ where: { id }, data });
	}

	async remove(userId: string, id: string) {
		const existing = await this.prisma.project.findUnique({ where: { id } });
		if (!existing) throw new NotFoundException('Project not found');
		if (existing.ownerId !== userId) throw new ForbiddenException('Not owner');
		await this.prisma.project.delete({ where: { id } });
		return { deleted: true };
	}
}
