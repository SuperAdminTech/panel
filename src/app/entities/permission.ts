import { SerializableEntity } from '../base/serializable-entity.base';
import { User } from './user';

export interface Permission {
  name: string;
  canActivate(user: User): boolean;
}

/**
 * Permission class is used to manage user permissions.
 * It checks wether a user can view/interact with some other parts of the system
 */
export class Permission implements Permission {
  public name = 'Default';
  public subPermissions: Permission[] = [];

  constructor(name: string, subPermissions: Permission[] = []) {
    this.name = name;
    this.subPermissions = subPermissions;
  }

  public is(permission: Permission | string) {
    if (permission instanceof Permission) {
      return this.name === permission.name;
    }

    return this.name === permission;
  }

  public includes(perm: Permission): boolean {
    return this.subPermissions.includes(perm);
  }

  public supports(perm: Permission): boolean {
    return this.is(perm) || this.includes(perm);
  }

  public canActivate(user: User): boolean {
    if (this.subPermissions && this.subPermissions.length) {
      for (const subPerm of this.subPermissions) {
        if (subPerm.canActivate(user)) {
          return true;
        }
      }
    }

    return false;
  }
}
