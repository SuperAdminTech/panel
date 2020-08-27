import { Role } from './role';
import { SerializableEntity } from '../base/serializable-entity.base';
import { getHighestRole } from '../roles';
import { ApplicationResponse } from '@qbitartifacts/caste-client-ng';

export interface IUser {
  id?: string;
  name: string;
  lastnames?: string;
  email?: string;
  birthDate?: string;
  roles?: Role[];
  created_at?: string;
  updated_at?: string;
  application?: ApplicationResponse;
}
export class User implements SerializableEntity, IUser {
  public name: string;
  public id: string;
  public lastnames: string;
  public email: string;
  public birthDate: string;
  public roles: Role[] = [];
  public created_at?: string;
  public updated_at?: string;
  public application?: ApplicationResponse;

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
    user.created_at = data.created_at;
    user.updated_at = data.updated_at;
    user.application = data.application;
    return user;
  }
}
