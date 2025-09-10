import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		if (!user || !user.role) throw new ForbiddenException('No user role');
		if (requiredRoles.includes(user.role)) return true;
		throw new ForbiddenException('Insufficient role');
	}
}
