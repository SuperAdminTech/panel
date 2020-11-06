import { version } from '../../package.json';

export const environment = {
  url: 'https://api.superadmin.org',
  realm: 'default',
  production: true,
  brand: {
    title: 'Superadmin',
  },
  debug: false,
  version,
};
