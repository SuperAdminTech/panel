import { IUser } from './../../entities/user';
import { RoleAdmin, RoleUser, RoleReadonly } from './../../roles/index';
import { User } from 'src/app/entities/user';

const baseUserData: IUser = {
  name: 'Manolo',
  lastnames: 'Edge Tejero',
  email: 'test@test.com',
  birthDate: '',
  id: 'test',
  roles: [],
};

// Admin user
export const MUserAdmin = new User()
  .fromJson(baseUserData)
  .setRoles([RoleAdmin, RoleUser]);

// Normal user
export const MUserUser = new User().fromJson(baseUserData).setRoles([RoleUser]);

// Readonly user
export const MUserReadOnly = new User()
  .fromJson(baseUserData)
  .setRoles([RoleReadonly]);
