import { MUserUser } from './../testing/mocks/users.mock';
import {
  PERMISSIONS,
  PermissionAdmin,
  PermissionUser,
  PermissionPublic,
} from './index';
import { MUserAdmin } from '../testing/mocks/users.mock';

describe('Permissions tests', () => {
  it('Permissions should import correctly', () => {
    expect(PERMISSIONS).toBeTruthy();
  });

  it('Permission .is("public")', () => {
    const isSameString = PERMISSIONS.public.is('public');
    expect(isSameString).toEqual(true);
  });

  it('Permission .is(PERMISSIONS.public)', () => {
    const isSamePerm = PERMISSIONS.public.is(PERMISSIONS.public);
    expect(isSamePerm).toEqual(true);
  });

  it('AdminPermission .includes(PERMISSIONS.public)', () => {
    const includes = PERMISSIONS.admin.includes(PERMISSIONS.public);
    expect(includes).toEqual(true);
  });

  it('AdminPermission .supports(PERMISSIONS.user)', () => {
    const includes = PERMISSIONS.admin.supports(PERMISSIONS.user);
    expect(includes).toEqual(true);
  });

  it('AdminPermission .is("admin")', () => {
    const includes = PERMISSIONS.admin.is('admin');
    expect(includes).toEqual(true);
  });

  it('AdminPermission .is(PermissionAdmin)', () => {
    const includes = PERMISSIONS.admin.is(PermissionAdmin);
    expect(includes).toEqual(true);
  });

  it('PublicPermission .canActivate(User[ADMIN])', () => {
    const includes = PermissionPublic.canActivate(MUserAdmin);
    expect(includes).toEqual(true);
  });

  it('PublicPermission .canActivate(User[ADMIN])', () => {
    const includes = PermissionPublic.canActivate(MUserAdmin);
    expect(includes).toEqual(true);
  });

  it('AdminPermission .canActivate(User[ADMIN])', () => {
    const includes = PermissionAdmin.canActivate(MUserAdmin);
    expect(includes).toEqual(true);
  });

  it('AdminPermission .canActivate(User[USER]) => false', () => {
    const includes = PermissionAdmin.canActivate(MUserUser);
    expect(includes).toEqual(false);
  });

  it('AdminPermission .canActivate(User[USER]) => false', () => {
    const includes = PermissionAdmin.canActivate(MUserUser);
    expect(includes).toEqual(false);
  });

  it('AdminPermission .canActivate(! User) => false', () => {
    const includes = PermissionAdmin.canActivate();
    expect(includes).toEqual(false);
  });

  it('UserPermission .canActivate(! User) => false', () => {
    const includes = PermissionUser.canActivate();
    expect(includes).toEqual(false);
  });
});
