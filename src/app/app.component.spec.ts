import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SessionCheckerService } from './services/session-checker.service';
import { environment } from 'src/environments/environment';
import { AppModule } from './app.module';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

const SessionCheckerMock = {
  initCheckIdle() {},
};

describe('AppComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule, HttpClientTestingModule],
      providers: [
        {
          provide: SessionCheckerService,
          useValue: SessionCheckerMock,
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    localStorage.removeItem(AuthService.SESSION_KEY);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'brand.title'`, () => {
    localStorage.removeItem(AuthService.SESSION_KEY);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(environment.brand.title);
  });

  it(`should not setup events if not logged login`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const auth$: AuthService = TestBed.inject(AuthService);

    localStorage.removeItem(AuthService.SESSION_KEY);
    auth$.removeSession();

    const app: AppComponent = fixture.debugElement.componentInstance;
    app.IDLE_CHECK_ENABLED = true;

    const checker: SessionCheckerService = TestBed.inject(SessionCheckerService);

    spyOn(checker, 'initCheckIdle');

    fixture.detectChanges();
    expect(checker.initCheckIdle).not.toHaveBeenCalled();
  });

  it(`logout should work`, () => {
    localStorage.removeItem(AuthService.SESSION_KEY);
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    const user$: UserService = TestBed.inject(UserService);
    const auth$: AuthService = TestBed.inject(AuthService);
    const router$: Router = TestBed.inject(Router);
    const events$: QEventsService = TestBed.inject(QEventsService);

    spyOn(user$, 'setUser');
    spyOn(auth$, 'removeSession');
    spyOn(router$, 'navigate');

    events$.fire(AuthService.LOGOUT_EVENT);

    expect(user$.setUser).toHaveBeenCalledWith(null);
    expect(auth$.removeSession).toHaveBeenCalled();
    expect(router$.navigate).toHaveBeenCalledWith(['/login']);
  });
});
