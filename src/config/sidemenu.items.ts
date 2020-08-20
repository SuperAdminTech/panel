import { PermissionAdmin, PermissionUser } from '../app/permissions/index';
import { Permission } from 'src/app/entities/permission';

export interface SidemenuItem {
  icon?: string;
  label: string;
  route?: string;
  separator?: boolean;
  action?: (...args: any[]) => any;
  permission: Permission;
}

export const SIDEMENU_ITEMS: SidemenuItem[] = [
  {
    icon: 'dashboard',
    label: 'DASHBOARD',
    route: '/dashboard',
    permission: PermissionUser,
  },
  {
    icon: 'face',
    label: 'PROFILE',
    route: '/profile',
    permission: PermissionUser,
  },
  // Admin items after separator
  {
    separator: true,
    label: 'ADMIN',
    permission: PermissionAdmin,
  },
  {
    icon: 'person',
    label: 'USERS',
    route: '/users',
    permission: PermissionAdmin,
  },
  {
    icon: 'group',
    label: 'ACCOUNTS',
    route: '/accounts',
    permission: PermissionAdmin,
  },
  {
    icon: 'apps',
    label: 'APPLICATIONS',
    route: '/applications',
    permission: PermissionAdmin,
  },
  {
    icon: 'lock',
    label: 'PERMISSIONS',
    route: '/permissions',
    permission: PermissionAdmin,
  },
];
