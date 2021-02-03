import {
  PermissionAdmin,
  PermissionSuperAdmin,
  PermissionUser,
} from '../app/permissions/index';
import { Permission } from 'src/app/entities/permission';
import { environment } from 'src/environments/environment';

export interface SidemenuItem {
  icon?: string;
  label: string;
  route?: string;
  separator?: boolean;
  action?: (...args: any[]) => any;
  permission: Permission;
  isExternal?: boolean;
  keyValue?: boolean;
  value?: any;
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
    permission: PermissionSuperAdmin,
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

  // Versions
  {
    separator: true,
    label: 'VERSION',
    permission: PermissionUser,
  },
  {
    keyValue: true,
    label: 'PANEL',
    value: environment.version,
    permission: PermissionUser,
  },
];
