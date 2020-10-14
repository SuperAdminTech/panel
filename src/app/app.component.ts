import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionUser } from './permissions/index';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './services/app.service';
import { SessionCheckerService } from './services/session-checker.service';
import { IDLE_CHECK_ENABLED } from './consts';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { SHORTCUTS } from 'src/config/shortcuts';
import {
  HotkeysService,
  HotkeysDialogComponent,
} from '@qbitartifacts/qbit-hotkeys';
import { QEventsService } from 'src/app/services/events.service';
import { DebugScreenComponent } from '@qbitartifacts/qbit-debug-screen';
import { CasteAuthService } from '@qbitartifacts/caste-client-ng';
import { User } from './entities/user';
import { castRoles } from './roles';

@Component({
  selector: 'caste-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private hotkeysSubscriptions: Subscription[] = [];
  public title = environment.brand.title;
  public permissionUser = PermissionUser;
  public debugModal: MatDialogRef<DebugScreenComponent>;
  public hotkeysModal: MatDialogRef<HotkeysDialogComponent>;
  public IDLE_CHECK_ENABLED = IDLE_CHECK_ENABLED;

  constructor(
    public user$: UserService,
    public auth$: AuthService,
    public app$: AppService,
    public sessionChecker: SessionCheckerService,
    public events: QEventsService,
    public router: Router,
    public route: ActivatedRoute,
    public hotkeys: HotkeysService,
    public dialog: MatDialog,
    public location: Location
  ) {
    this.setupEvents();
    this.setupHotKeys();

    route.queryParams.subscribe(this.onParams);
  }

  /* istanbul ignore next */
  ngOnDestroy() {
    if (this.hotkeysSubscriptions && this.hotkeysSubscriptions.length) {
      this.hotkeysSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

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

  private setupHotKeys() {
    // Register hotkeys help
    this.hotkeysSubscriptions.push(
      this.hotkeys
        .addShortcut(SHORTCUTS.hotkeysHelp)
        .subscribe(this.toggleHotkeysHelp.bind(this))
    );

    // Register other shortcuts
    if (environment.debug) {
      this.hotkeysSubscriptions.push(
        this.hotkeys
          .addShortcut(SHORTCUTS.debugScreen)
          .subscribe(this.toggleDebugDialog.bind(this))
      );
    }

    this.hotkeysSubscriptions.push(
      this.hotkeys
        .addShortcut(SHORTCUTS.navigation.back)
        .subscribe(this.location.back.bind(this.location))
    );

    this.hotkeysSubscriptions.push(
      this.hotkeys
        .addShortcut(SHORTCUTS.navigation.forward)
        .subscribe(this.location.forward.bind(this.location))
    );
  }

  private setupEvents() {
    this.events.on(AuthService.LOGIN_EVENT).subscribe((resp) => {});

    this.events.on(AuthService.LOGOUT_EVENT).subscribe((resp) => {
      this.auth$.removeSession();
      this.user$.setUser(null);
      this.router.navigate(['/login']);
      localStorage.removeItem(SessionCheckerService.LS_IDLE_KEY);
    });
  }

  /* istanbul ignore next */
  private toggleDebugDialog() {
    if (!this.debugModal) {
      this.debugModal = this.dialog.open(DebugScreenComponent, {
        width: '500px',
        hasBackdrop: false,
        position: {
          bottom: '0',
        },
      });
    } else {
      this.debugModal.close();
      this.debugModal = null;
    }
  }

  /* istanbul ignore next */
  private toggleHotkeysHelp() {
    if (!this.hotkeysModal) {
      this.hotkeysModal = this.dialog.open(HotkeysDialogComponent, {
        width: '50%',
        data: this.hotkeys.hotkeys,
      });
    } else {
      this.hotkeysModal.close();
      this.hotkeysModal = null;
    }
  }

  /* istanbul ignore next */
  private recoverSessionAndUser() {
    const savedSession = this.auth$.recoverSession();
    const validSession = savedSession && savedSession.isActive();

    if (validSession) {
      this.auth$.setSession(savedSession);

      const tokenData = CasteAuthService.decodeToken(savedSession.token);

      const user = new User()
        .fromJson({ name: tokenData.username, id: tokenData.id })
        .setRoles(castRoles(tokenData.roles));

      this.user$.setUser(user);
      this.events.fire(AuthService.LOGIN_EVENT);
    } else {
      this.events.fire(AuthService.LOGOUT_EVENT);
    }
  }
}
