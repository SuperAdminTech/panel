import { ROLES, RoleUser } from './../roles/index';
import { User } from './../entities/user';
import { Permission } from '../entities/permission';

// Public permission (is this permission is set, any user with any role can access this resource)
export class UserPermission extends Permission {
  constructor(subPermissions: Permission[]) {
    super('user', subPermissions);
  }

  public canActivate(user?: User) {
    if (!user) {
      return false;
    }

    const superActivate = super.canActivate(user);
    const userCan = user.hasRole(RoleUser);

    return userCan && superActivate;
  }
}
