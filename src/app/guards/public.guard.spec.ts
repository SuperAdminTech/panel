import { TestBed } from '@angular/core/testing';
import { PublicGuard } from './public.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Session } from '../entities/session';
import { UrlTree } from '@angular/router';
import { QEventsService } from 'src/app/services/events.service';
import { User } from '@qbitartifacts/caste-client-ng';
import { AppModule } from '../app.module';

describe('PublicGuard', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const guard: PublicGuard = TestBed.get(PublicGuard);
    expect(guard).toBeTruthy();
  });

  it('should activate by default (if no session and user are present)', () => {
    const guard: PublicGuard = TestBed.get(PublicGuard);
    expect(guard.canActivate(null, {} as any)).toEqual(true);
  });

  it('should not activate if session present', () => {
    const user$: UserService = TestBed.get(UserService);
    const auth$: AuthService = TestBed.get(AuthService);

    user$.user = new User();

    const mockSession = new Session();
    mockSession.expireDate = new Date('10/6/3020');
    auth$.setSession(mockSession);

    const guard: PublicGuard = TestBed.get(PublicGuard);
    expect(guard.canActivate(null, {} as any) instanceof UrlTree).toBeTruthy();
  });
});
