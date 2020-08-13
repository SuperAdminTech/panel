import { PermissionAdmin, PermissionUser } from './../../permissions/index';
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
    icon: 'group',
    label: 'USERS',
    route: '/users',
    permission: PermissionAdmin,
  },
  {
    icon: 'format_bold',
    label: 'BOTS',
    route: '/bots',
    permission: PermissionAdmin,
  },
];
