import { AppModule } from '../../../app.module';
import { Title, BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { PageBaseComponent } from 'src/app/base/page.base';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: Title, useClass: Title }],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Login Button disabled by default', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#login'));
    expect(btn.attributes.disabled).toBeTruthy();
  });

  it('Login Button enables correctly', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const usernameEl = fixture.debugElement.query(By.css('#username'));
      const passwordEl = fixture.debugElement.query(By.css('#password'));
      const btn = fixture.debugElement.query(By.css('#login'));

      usernameEl.nativeElement.value = 'Test User';
      usernameEl.nativeElement.dispatchEvent(new Event('input'));
      passwordEl.nativeElement.value = 'Test Pass';
      passwordEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(btn.attributes.disabled).not.toBeTruthy();
      expect(component.username.value).toBe('Test User');
      expect(component.password.value).toBe('Test Pass');
    });
  });

  it('On submit works with data', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.username.setValue('test');
    component.password.setValue('test');

    const result = component.onSubmit();
    expect(result).toEqual(true);
  });

  it('On submit false if no data ', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.password.setValue('test');

    const result = component.onSubmit();
    expect(result).toEqual(false);
  });
});
