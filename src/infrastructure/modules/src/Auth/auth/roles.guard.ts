import { Injectable, CanActivate, ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Role {
    Read = 'read',
    Write = 'write',
    Admin = 'admin',
  }

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
  
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();

    if(!(user && requiredRoles.some((role) => user.roles?.includes(role)))){
      throw new UnauthorizedException('User does not provide the role authorized to access this resource');
    }

    return true;
  }
}

