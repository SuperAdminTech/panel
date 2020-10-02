import { Injectable } from '@angular/core';
import { Session } from '../entities/session';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static LOGIN_EVENT = 'auth:login';
  static LOGOUT_EVENT = 'auth:logout';
  static SESSION_KEY = 'session';
  public session: Session;

  public redirectUrl: string;

  constructor(public events: QEventsService) {}

  public setSession(session: Session) {
    this.session = session;
    this.saveSession();

    /* istanbul ignore else */
    if (session.isActive()) {
      this.events.fire(AuthService.LOGIN_EVENT);
    }
    return this;
  }

  public isSessionSaved() {
    return !!localStorage.getItem(AuthService.SESSION_KEY);
  }

  public recoverSession(): Session {
    if (this.isSessionSaved()) {
      const savedSession = localStorage.getItem(AuthService.SESSION_KEY);
      return new Session().fromJson(JSON.parse(savedSession));
    }

    return null;
  }

  public saveSession() {
    localStorage.setItem(
      AuthService.SESSION_KEY,
      JSON.stringify(this.session.toJson())
    );

    return this;
  }

  public removeSession() {
    localStorage.removeItem(AuthService.SESSION_KEY);
  }

  public hasSession(): boolean {
    return !!this.session;
  }

  public sessionActive(): boolean {
    return this.hasSession() && this.session.isActive();
  }

  public logout() {
    this.events.fire(AuthService.LOGOUT_EVENT);
  }
}
