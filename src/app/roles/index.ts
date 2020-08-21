import { Role } from '../entities/role';

export const RoleReadonly = new Role('ROLE_READONLY', [], 'bg-yellow');
export const RoleUser = new Role('ROLE_USER', [], 'bg-blue');
export const RoleAdmin = new Role('ROLE_ADMIN', [RoleUser], 'bg-green');
export const RoleSuperadmin = new Role(
  'ROLE_SUPERADMIN',
  [RoleUser, RoleAdmin],
  'bg-purple'
);

export const ROLES = {
  Readonly: RoleReadonly,
  User: RoleUser,
  Admin: RoleAdmin,
  Superadmin: RoleSuperadmin,
};

const roleMap = {
  ROLE_USER: ROLES.User,
  ROLE_READONLY: ROLES.Readonly,
  ROLE_ADMIN: ROLES.Admin,
  ROLE_SUPER_ADMIN: ROLES.Superadmin,
};

const roleHierarchy = [
  ROLES.Superadmin,
  ROLES.Admin,
  ROLES.User,
  ROLES.Readonly,
];

export function castRoles(roles: string[]) {
  if (!roles || roles.length === 0) {
    return [];
  }

  const validRoles = Object.keys(roleMap);
  const isValidRole = (role: string) => validRoles.includes(role);
  const toRoleInstance = (role: string) => roleMap[role];

  return roles.filter(isValidRole).map(toRoleInstance);
}

export function getHighestRole(roles: Role[]): Role {
  let highest = Infinity;
  let highestRole = null;

  for (const role of roles) {
    const index = roleHierarchy.indexOf(role);
    if (index < highest) {
      highestRole = role;
      highest = index;
    }
  }

  return highestRole;
}
