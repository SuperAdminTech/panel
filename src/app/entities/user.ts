import { Role } from './role';
import { SerializableEntity } from '../base/serializable-entity.base';
import { getHighestRole } from '../roles';

export interface IUser {
  id?: string;
  name: string;
  lastnames?: string;
  email?: string;
  birthDate?: string;
  roles?: Role[];
}
export class User implements SerializableEntity, IUser {
  public name: string;
  public id: string;
  public lastnames: string;
  public email: string;
  public birthDate: string;
  public roles: Role[] = [];

  public hasRole(role: Role) {
    return this.roles.includes(role);
  }

  public addRole(role: Role) {
    this.roles.push(role);
    return this;
  }

  public setRoles(roles: Role[]) {
    this.roles = roles;
    return this;
  }

  public getRoles(): Role[] {
    return this.roles;
  }

  public getType() {
    const role = getHighestRole(this.roles);
    return role ? role.name.replace('ROLE_', '') : '...';
  }

  public fromJson(data: IUser): User {
    const user = new User();
    user.name = data.name;
    user.id = data.id;
    user.lastnames = data.lastnames;
    user.email = data.email;
    user.roles = data.roles;
    user.birthDate = data.birthDate;
    return user;
  }
}
