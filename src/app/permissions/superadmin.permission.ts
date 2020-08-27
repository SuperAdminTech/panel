import { Permission } from '../entities/permission';
import { User } from '../entities/user';
import { ROLES } from '../roles';

export class SuperadminPermission extends Permission {
  constructor(subPermissions: Permission[]) {
    super('sadmin', subPermissions);
  }

  public canActivate(user?: User) {
    if (!user) {
      return false;
    }

    const superActivate = super.canActivate(user);
    const userCan = user.hasRole(ROLES.Superadmin);

    return userCan && superActivate;
  }
}
