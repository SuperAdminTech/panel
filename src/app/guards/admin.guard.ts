import { PermissionAdmin } from '../permissions/index';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private user$: UserService,
    public auth$: AuthService,
    public router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    console.log('ADMIN_GUARD');
    const hasPermission = PermissionAdmin.canActivate(this.user$.user);

    if (hasPermission) {
      return true;
    } else {
      return this.router.parseUrl('dashboard');
    }
  }
}
