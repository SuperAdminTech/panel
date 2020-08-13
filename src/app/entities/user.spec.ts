import { RoleReadonly } from './../roles/index';
import { User } from './user';
import { ROLES } from '../roles';

describe('User', () => {
  const roles = [ROLES.Admin];

  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('User .setRoles & .getRoles', () => {
    const user = new User();
    user.setRoles(roles);

    expect(user.getRoles()).toEqual(roles);
  });

  it('User .hasRole', () => {
    const user = new User();
    user.setRoles(roles);

    expect(user.getRoles()).toEqual(roles);
  });

  it('User .setRoles & .getRoles', () => {
    const user = new User();
    user.addRole(ROLES.Readonly);

    expect(user.hasRole(RoleReadonly)).toEqual(true);
  });

  it('User .fromJson', () => {
    const data = {
      name: 'test',
      email: 'test',
      lastnames: 'asda',
      roles: [],
      birthDate: '10/20/1996',
      id: 'test',
    };
    const user = new User().fromJson(data);

    expect(user.name).toEqual(data.name);
    expect(user.lastnames).toEqual(data.lastnames);
    expect(user.email).toEqual(data.email);
    expect(user.birthDate).toEqual(data.birthDate);
  });
});
