import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Permission } from '../entities/permission';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private user$: UserService,
    public auth$: AuthService,
    public router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    const userIsPresent = this.user$.hasUser();
    const hasSession = this.auth$.hasSession();
    const sessionActive = this.auth$.sessionActive();

    // If hasSession and userIsPresent, don't allow to view Public Pages
    if (hasSession && sessionActive && userIsPresent) {
      return this.router.parseUrl('dashboard');
    } else {
      return true;
    }
  }
}
