import { IDLE_MAX_TIME } from './../consts';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IdleNotificationComponent } from '../dialogs/idle-notification/idle.dia';
import { IDLE_REFRESH } from '../consts';
import { logFn } from '../decorators/log.function';

@Injectable({
  providedIn: 'root',
})
export class SessionCheckerService {
  static LS_IDLE_KEY = 'idle:last_action';
  idleModal: any;
  intervalObserver: Subscription;

  idleSecondsCounter: number;
  expiresIn: number;
  minutes: number;
  seconds: number;

  constructor(public dialog: MatDialog, public auth: AuthService) {}

  // Fn called any time the user makes an action
  public idleOnAction() {
    this.idleSecondsCounter = 0;
    localStorage.setItem(
      SessionCheckerService.LS_IDLE_KEY,
      Date.now().toString()
    );
  }

  /* istanbul ignore next */
  public initCheckIdle(): void {
    // Bind action to document events
    document.onclick = this.idleOnAction.bind(this);
    document.onmousemove = this.idleOnAction.bind(this);
    document.onkeypress = this.idleOnAction.bind(this);

    // Setup interval, runs a check on interval
    this.intervalObserver = interval(IDLE_REFRESH).subscribe((x) =>
      this.checkIdleTime(this.getIdleTime(Date.now()))
    );

    // Run check in case it is already expired
    this.checkIdleTime(this.getIdleTime(Date.now()));
  }

  /* istanbul ignore next */
  private showIdleMessage(): void {
    this.idleModal = this.dialog.open(IdleNotificationComponent, {
      disableClose: true,
    });

    this.idleModal
      .afterClosed()
      .subscribe(this.handleIdleModalClosed.bind(this));

    return this.idleModal;
  }

  /* istanbul ignore next */
  private handleIdleModalClosed(keepAlive) {
    if (keepAlive) {
      this.initCheckIdle();
    } else {
      this.handleExpired();
    }

    this.idleModal = null;
  }

  /* istanbul ignore next */
  public closeIdleMessage(): void {
    if (this.idleModal) {
      this.idleModal.close();
      this.idleModal = null;
    }
  }

  public getIdleTime(now: number) {
    const lastAction = localStorage.getItem(SessionCheckerService.LS_IDLE_KEY);
    const idleTime = now - Number(lastAction);

    return idleTime;
  }

  /**
   * Check wether a idleTime has exceeded maxToExceed ms
   * @param idleTime (timestamp)
   * @param maxToExceed (ms)
   */
  @logFn
  public hasIdleTimeExceededMax(
    idleTime: number,
    maxToExceed: number = IDLE_MAX_TIME
  ) {
    return idleTime < maxToExceed;
  }

  public checkIdleTime(idleTime: number): boolean {
    if (this.hasIdleTimeExceededMax(idleTime)) {
      /* istanbul ignore if */
      if (this.intervalObserver) {
        this.intervalObserver.unsubscribe();
      }
      this.showIdleMessage();
      return true;
    }

    return false;
  }

  public handleExpired() {
    this.closeIdleMessage();
    this.auth.logout();
  }
}
