import { Injectable, CanActivate, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserTypeNames } from 'src/user-type/user-types-names';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeNames[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserTypeNames[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Extract user type from JWT payload
    const userRoles = user.user?.roles;
    const userTypeId = this.getUserTypeIdFromRoleName(userRoles?.[0]);
    
    const hasRole = requiredRoles.some((role) => role === userTypeId);
    
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions to access this resource');
    }
    
    return true;
  }

  private getUserTypeIdFromRoleName(roleName: string): UserTypeNames | null {
    switch (roleName) {
      case 'PMU Admin':
        return UserTypeNames.PMUAdmin;
      case 'Country Admin':
        return UserTypeNames.CountryAdmin;
      case 'PMU User':
        return UserTypeNames.PMUUser;
      case 'ICAT Admin':
        return UserTypeNames.ICATAdmin;
      case 'ICAT User':
        return UserTypeNames.ICATUser;
      default:
        return null;
    }
  }
} 