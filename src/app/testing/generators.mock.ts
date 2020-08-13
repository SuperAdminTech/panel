import {
  RoleUser,
  RoleAdmin,
  RoleSuperadmin,
  RoleReadonly,
} from '../roles/index';
import { Role } from '../entities/role';
import { Instance, IInstance } from '../entities/instance';
import { Bot } from '../entities/bot';
import { Exchange } from '../entities/exchange';

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

export function createInstance(id: string): Instance {
  const data: IInstance = {
    id,
    name: generateName(),
    description: '',
    alias: generateName(),
    bot: new Bot().fromJson({
      name: 'test',
      description: '',
      type: 'demo',
      id: 'fff-fff-fff',
      currency: 'EUR',
    }),
    updated_at: '6/10/2020',
    exchange: new Exchange().fromJson({ name: 'Kraken', icon: '' }),
    balance: 20,
    benefit: 300,
    status: 'running',
    exchange_access_key: 'key',
    exchange_access_secret: 'secret',
    config: {},
  };

  return new Instance().fromJson(data);
}

export function createBot(id: string): Bot {
  return new Bot().fromJson({
    name: generateName(),
    description: '',
    type: 'demo',
    id,
    currency: 'EUR',
  });
}
