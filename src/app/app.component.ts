import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './services/app.service';
import { SessionCheckerService } from './services/session-checker.service';
import { IDLE_CHECK_ENABLED } from './consts';
import { Location } from '@angular/common';
import { QEventsService } from 'src/app/services/events.service';
import {
  CasteAuthService,
  castRoles,
  PermissionUser,
  User,
} from '@qbitartifacts/caste-client-ng';
import { QSidemenuService } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = environment.brand.title;
  public permissionUser = PermissionUser;
  public IDLE_CHECK_ENABLED = IDLE_CHECK_ENABLED;

  constructor(
    public user$: UserService,
    public auth$: AuthService,
    public app$: AppService,
    public sessionChecker: SessionCheckerService,
    public events: QEventsService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public location: Location,
    public sidemenu$: QSidemenuService
  ) {
    this.setupEvents();
    route.queryParams.subscribe(this.onParams.bind(this));
  }

  /* istanbul ignore next*/
  ngOnInit() {
    if (this.auth$.isSessionSaved()) {
      this.recoverSessionAndUser();
    }

    // Setup locales and language
    this.app$.setUpLang();
  }

  private onParams(params) {
    console.log(params);
    if (params.realm) {
      localStorage.setItem('realm', params.realm);
    }
  }

  /* istanbul ignore next*/
  private setupEvents() {
    this.events.on(AuthService.LOGIN_EVENT).subscribe((resp) => {
      this.addApiVersionItem();
    });

    this.events.on(AuthService.LOGOUT_EVENT).subscribe((resp) => {
      this.auth$.removeSession();
      this.user$.setUser(null);
      this.router.navigate(['/login']);
      localStorage.removeItem(SessionCheckerService.LS_IDLE_KEY);
    });
  }

  /* istanbul ignore next */
  private recoverSessionAndUser() {
    const savedSession = this.auth$.recoverSession();
    const validSession = savedSession && savedSession.isActive();

    if (validSession) {
      this.auth$.setSession(savedSession);

      const tokenData: any = CasteAuthService.decodeToken(savedSession.token);

      const user = new User()
        .fromJson(tokenData)
        .setRoles(castRoles(tokenData.roles));

      this.user$.setUser(user);
      this.events.fire(AuthService.LOGIN_EVENT);
    } else {
      this.events.fire(AuthService.LOGOUT_EVENT);
    }
  }

  private async addApiVersionItem() {
    await this.app$.getApiVersion().subscribe({
      next: (resp) => this.sidemenu$.addApiVersionItem(resp.code),
    });
  }
}
