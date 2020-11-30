import { PermissionAdmin } from '../permissions/index';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
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
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    console.log('adminGuard');
    if (route && route.queryParams && route.queryParams.realm) {
      localStorage.setItem('realm', route.queryParams.realm);
    }
    const hasPermission = PermissionAdmin.canActivate(this.user$.user);

    if (hasPermission) {
      return true;
    } else {
      return this.router.parseUrl('dashboard');
    }
  }
}
