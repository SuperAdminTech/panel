import {
  ROLES,
  RoleUser,
  RoleAdmin,
  getHighestRole,
  RoleSuperadmin,
  RoleReadonly,
  castRoles,
} from './index';

describe('Roles tests', () => {
  it('Roles should import correctly', () => {
    expect(ROLES).toBeTruthy();
  });

  it('Role .is("ROLE_USER")', () => {
    const isSameString = RoleUser.is('ROLE_USER');
    expect(isSameString).toEqual(true);
  });

  it('RoleUser .is(RoleUser)', () => {
    const isSameString = ROLES.User.is(RoleUser);
    expect(isSameString).toEqual(true);
  });

  it('RoleAdmin .includes(RoleUser)', () => {
    const adminContainsUser = RoleAdmin.includes(RoleUser);
    expect(adminContainsUser).toEqual(true);
  });

  it('RoleAdmin .supports(RoleUser)', () => {
    const adminContainsUser = RoleAdmin.supports(RoleUser);
    expect(adminContainsUser).toEqual(true);
  });

  it('castRoles', () => {
    const roles = ['ROLE_USER', 'ROLE_ADMIN'];
    const castedRoles = castRoles(roles);
    expect(castedRoles).toEqual([RoleUser, RoleAdmin]);
  });

  it('castRoles empty', () => {
    const roles = [];
    const castedRoles = castRoles(roles);
    expect(castedRoles).toEqual([]);
  });

  it('getHighestRole RoleAdmin', () => {
    const roles = [RoleUser, RoleAdmin];
    const highestRole = getHighestRole(roles);
    expect(highestRole).toEqual(RoleAdmin);
  });

  it('getHighestRole RoleSuperadmin', () => {
    const roles = [RoleUser, RoleAdmin, RoleSuperadmin];
    const highestRole = getHighestRole(roles);
    expect(highestRole).toEqual(RoleSuperadmin);
  });

  it('getHighestRole RoleUser', () => {
    const roles = [RoleUser, RoleReadonly];
    const highestRole = getHighestRole(roles);
    expect(highestRole).toEqual(RoleUser);
  });
});
