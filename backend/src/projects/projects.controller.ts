import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
	constructor(private projects: ProjectsService) {}

	@Post()
		create(@Request() req: any, @Body() dto: CreateProjectDto) {
			return this.projects.create(req.user.sub, dto.name);
	}

	@Get()
	list(@Request() req: any) {
		return this.projects.findAllForUser(req.user.sub);
	}

	@Get(':id')
	get(@Request() req: any, @Param('id') id: string) {
		return this.projects.findOneOwned(req.user.sub, id);
	}

	@Patch(':id')
	update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
		return this.projects.update(req.user.sub, id, dto);
	}

	@Delete(':id')
	delete(@Request() req: any, @Param('id') id: string) {
		return this.projects.remove(req.user.sub, id);
	}
}
