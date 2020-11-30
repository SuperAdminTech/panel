import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable()
export class AuthedGuard implements CanActivate {
  constructor(
    private user$: UserService,
    public auth$: AuthService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const userIsPresent = this.user$.hasUser();
    const hasSession = this.auth$.hasSession();
    const sessionActive = this.auth$.sessionActive();

    if (route.queryParams && route.queryParams.realm) {
      localStorage.setItem('realm', route.queryParams.realm);
    }

    if (hasSession && sessionActive && userIsPresent) {
      return true;
    } else {
      this.auth$.redirectUrl = state.url;
      return this.router.parseUrl('login');
    }
  }
}
