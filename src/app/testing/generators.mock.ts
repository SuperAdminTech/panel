import { Role, RoleUser, RoleAdmin, RoleSuperadmin, RoleReadonly } from '@qbitartifacts/caste-client-ng';


const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
const DOMAINS: string[] = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
];
const ROLES: Role[] = [RoleUser, RoleAdmin, RoleSuperadmin, RoleReadonly];

export function generateRole() {
  return [ROLES[Math.round(Math.random() * (ROLES.length - 1))]];
}

export function generateName() {
  return NAMES[Math.round(Math.random() * (NAMES.length - 1))];
}

export function generateLastName() {
  return NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
}

export function generateEmail(name?: string) {
  return (
    (name || generateName()).toLowerCase() +
    '@' +
    DOMAINS[Math.round(Math.random() * (DOMAINS.length - 1))]
  );
}
