import { Permission } from 'src/app/entities/permission';
import { User } from '../entities/user';

// Public permission (is this permission is set, any user with any role can access this resource)
export class PublicPermission extends Permission {
  constructor(subPermissions: Permission[]) {
    super('public', subPermissions);
  }

  public canActivate(user: User) {
    return true;
  }
}
