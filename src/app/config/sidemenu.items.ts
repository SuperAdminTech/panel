import { InternalPermission, PermissionAdmin, PermissionSuperAdmin, PermissionUser } from '@qbitartifacts/caste-client-ng';
import { QSidemenuItem } from '@qbitartifacts/qbit-kit-ng';
import { environment } from 'src/environments/environment';


export const SIDEMENU_ITEMS: QSidemenuItem[] = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    label: 'DASHBOARD',
    route: '/dashboard',
    permission: PermissionUser,
  },
  // {
  //   name: 'profile',
  //   icon: 'face',
  //   label: 'PROFILE',
  //   route: '/profile',
  //   permission: PermissionUser,
  // },
  // Admin items after separator
  {
    name: 'separator_admin',
    separator: true,
    label: 'ADMIN',
    permission: PermissionAdmin,
  },
  {
    name: 'users',
    icon: 'person',
    label: 'USERS',
    route: '/users',
    permission: PermissionSuperAdmin,
  },
  {
    name: 'accounts',
    icon: 'group',
    label: 'ACCOUNTS',
    route: '/accounts',
    permission: PermissionAdmin,
  },
  {
    name: 'applications',
    icon: 'apps',
    label: 'APPLICATIONS',
    route: '/applications',
    permission: PermissionAdmin,
  },
  {
    name: 'permissions',
    icon: 'lock',
    label: 'PERMISSIONS',
    route: '/permissions',
    permission: PermissionAdmin,
  },

  // Versions
  {
    name: 'version_separator',
    separator: true,
    label: 'VERSION',
    permission: PermissionUser,
  },
  {
    name: 'panel_version',
    keyValue: true,
    label: 'PANEL',
    value: environment.version,
    permission: PermissionUser,
  },
];
