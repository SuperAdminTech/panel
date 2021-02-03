import { AppModule } from '../../app.module';
import { Title, BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: Title, useClass: Title }],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Signup Button disabled by default', () => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#signup'));
    expect(btn.attributes.disabled).toBeTruthy();
  });

  it('Singup Button enables correctly', async () => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const usernameEl = fixture.debugElement.query(By.css('#username'));
      const passwordEl = fixture.debugElement.query(By.css('#password'));
      const btn = fixture.debugElement.query(By.css('#signup'));

      usernameEl.nativeElement.value = 'Test User';
      usernameEl.nativeElement.dispatchEvent(new Event('input'));
      passwordEl.nativeElement.value = 'Test Pass';
      passwordEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(btn.attributes.disabled).not.toBeTruthy();
      expect(component.email.value).toBe('Test User');
      expect(component.password.value).toBe('Test Pass');
    });
  });

  it('isLoading works', () => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    component.setIsLoading(true);
    expect(component.isLoading).toEqual(true);
  });

  // it('On submit works with data', async () => {
  //   fixture = TestBed.createComponent(SignupComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.username.setValue('test' + Math.random());
  //   component.password.setValue('test' + Math.random());

  //   const result = component.onSubmit();
  //   expect(result).toEqual(true);
  // });

  // it('On submit works with bad data', async () => {
  //   fixture = TestBed.createComponent(SignupComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   component.username.setValue('');
  //   component.password.setValue('test');

  //   const result = component.onSubmit();
  //   expect(result).toEqual(false);
  // });
});
