import { Permission } from '../entities/permission';
import { User } from '../entities/user';
import { ROLES } from '../roles';

export class AdminPermission extends Permission {
  constructor(subPermissions: Permission[]) {
    super('admin', subPermissions);
  }

  public canActivate(user?: User) {
    if (!user) {
      return false;
    }

    const superActivate = super.canActivate(user);
    const userCan = user.hasRole(ROLES.Admin);

    return userCan && superActivate;
  }
}
