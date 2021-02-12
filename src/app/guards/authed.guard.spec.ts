import { TestBed } from '@angular/core/testing';
import { AuthedGuard } from './authed.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Session } from '../entities/session';
import { UrlTree } from '@angular/router';
import { QEventsService } from 'src/app/services/events.service';
import { User } from '@qbitartifacts/caste-client-ng';
import { AppModule } from '../app.module';

describe('AuthedGuard', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const guard: AuthedGuard = TestBed.get(AuthedGuard);
    expect(guard).toBeTruthy();
  });

  it('should not activate by default (if no session and user are present)', () => {
    const guard: AuthedGuard = TestBed.get(AuthedGuard);
    expect(guard.canActivate({} as any, {} as any) instanceof UrlTree).toEqual(
      true
    );
  });

  it('should activate if session present', () => {
    const user$: UserService = TestBed.get(UserService);
    const auth$: AuthService = TestBed.get(AuthService);

    user$.user = new User();

    const mockSession = new Session();
    mockSession.expireDate = new Date('10/6/3020');
    auth$.setSession(mockSession);

    const guard: AuthedGuard = TestBed.get(AuthedGuard);
    expect(guard.canActivate({} as any, {} as any)).toEqual(true);
  });
});
