import { MSessionActive } from '../testing/mocks/session.mock';
import { MUserUser, MUserAdmin } from '../testing/mocks/users.mock';
import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UrlTree } from '@angular/router';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

describe('AdminGuard', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AdminGuard, AuthService, UserService, QEventsService],
    })
  );

  it('should be created', () => {
    const guard: AdminGuard = TestBed.get(AdminGuard);
    expect(guard).toBeTruthy();
  });

  it('should not activate by default (if no session and user are present)', () => {
    const guard: AdminGuard = TestBed.get(AdminGuard);
    const result = guard.canActivate();

    expect(result instanceof UrlTree).toEqual(true);
    expect((result as UrlTree).toString()).toEqual('/dashboard');
  });

  it('should activate if user is admin', () => {
    const user$: UserService = TestBed.get(UserService);
    const auth$: AuthService = TestBed.get(AuthService);

    user$.setUser(MUserAdmin);
    auth$.setSession(MSessionActive);

    const guard: AdminGuard = TestBed.get(AdminGuard);
    expect(guard.canActivate()).toEqual(true);
  });

  it('should not activate if user is not admin', () => {
    const user$: UserService = TestBed.get(UserService);
    const auth$: AuthService = TestBed.get(AuthService);

    user$.setUser(MUserUser);
    auth$.setSession(MSessionActive);

    const guard: AdminGuard = TestBed.get(AdminGuard);
    const result = guard.canActivate();

    expect(result instanceof UrlTree).toEqual(true);
    expect((result as UrlTree).toString()).toEqual('/dashboard');
  });
});