import { AppModule } from 'src/app/app.module';
import { Session } from './../entities/session';
import { MSessionActive } from './../testing/mocks/session.mock';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    localStorage.clear();
  });

  it('should be created', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    expect(auth$).toBeTruthy();
  });

  it('.isSessionSaved with session', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const sess = MSessionActive;

    localStorage.setItem(AuthService.SESSION_KEY, JSON.stringify(sess));

    const sessionSaved = auth$.isSessionSaved();

    expect(sessionSaved).toEqual(true);
  });

  it('.isSessionSaved without session', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const sessionSaved = auth$.isSessionSaved();

    expect(sessionSaved).toEqual(false);
  });

  it('.recoverSession', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const sess = new Session().fromJson({
      expireDate: new Date('10/6/2020'),
      token: 'test',
    });

    localStorage.setItem(AuthService.SESSION_KEY, JSON.stringify(sess));

    const sessionSaved = auth$.recoverSession();

    expect(sessionSaved.expireDate).toEqual(sess.expireDate);
    expect(sessionSaved.token).toEqual(sess.token);
  });

  it('.recoverSession with no session saved', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const sessionSaved = auth$.recoverSession();

    expect(sessionSaved).toEqual(null);
  });

  it('.saveSession', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const sess = new Session().fromJson({
      expireDate: new Date('10/6/2020'),
      token: 'test',
    });

    auth$.setSession(sess).saveSession();

    const lsSession = localStorage.getItem(AuthService.SESSION_KEY);
    const expectedSession = JSON.stringify(sess);

    expect(lsSession).toEqual(expectedSession);
  });

  it('.isSessionSaved', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    localStorage.setItem(
      AuthService.SESSION_KEY,
      JSON.stringify(MSessionActive.toJson())
    );

    expect(auth$.isSessionSaved()).toEqual(true);
  });

  it('.recoverSession', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    localStorage.setItem(
      AuthService.SESSION_KEY,
      JSON.stringify(MSessionActive.toJson())
    );

    expect(auth$.recoverSession().toJson()).toEqual(MSessionActive.toJson());
  });

  it('.setSession if active, should emit event', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const events$: QEventsService = TestBed.get(QEventsService);

    spyOn(events$, 'fire');

    auth$.setSession(MSessionActive);
    expect(events$.fire).toHaveBeenCalledWith(AuthService.LOGIN_EVENT);
  });

  it('.removeSession', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    auth$.setSession(MSessionActive);
    auth$.removeSession();

    expect(localStorage.getItem(AuthService.SESSION_KEY)).toEqual(null);
  });

  it('logout should emit event', () => {
    const auth$: AuthService = TestBed.get(AuthService);
    const events$: QEventsService = TestBed.get(QEventsService);

    spyOn(events$, 'fire');
    auth$.logout();

    expect(events$.fire).toHaveBeenCalledWith(AuthService.LOGOUT_EVENT);
  });
});
