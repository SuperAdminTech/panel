import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PublicGuard } from './../../guards/public.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { LoadablePageComponent } from 'src/app/base/loadable.page';
import { TranslateService } from '@ngx-translate/core';
import {
  CasteAuthService,
  LoginResponse,
} from '@qbitartifacts/caste-client-ng';
import { Session } from 'src/app/entities/session';
import { User } from 'src/app/entities/user';
import { castRoles } from 'src/app/roles';

@Component({
  selector: 'caste-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends PageBaseComponent
  implements AfterContentInit, LoadablePageComponent {
  static guards: any[] = [PublicGuard];
  public title = 'Login';
  public hidePass = true;
  public isLoading = false;

  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    title: Title,
    private formBuilder: FormBuilder,
    public translate$: TranslateService,
    public auth$: AuthService,
    public user$: UserService,
    public router: Router,
    public qbitAuth: CasteAuthService
  ) {
    super(title, translate$);
  }

  public ngAfterContentInit() {
    super.ngAfterContentInit();
    this.setRealm();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public setRealm() {
    const realmSaved = localStorage.getItem('realm');
    if (realmSaved) {
      this.qbitAuth.addConfig('realm', realmSaved);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public onSubmit(): boolean {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return false;
    }

    this.setIsLoading(true);

    this.qbitAuth
      .signIn({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: this.loginSuccess.bind(this),
        error: this.loginError.bind(this),
      });

    return true;
  }

  /* istanbul ignore next */
  private loginSuccess(resp: LoginResponse) {
    this.setIsLoading(false);

    const expireDateTimestampSec = new Date(resp.exp * 1000);
    const session = new Session().fromJson({
      token: resp.token,
      expireDate: expireDateTimestampSec,
    });
    this.auth$.setSession(session);
    this.qbitAuth.saveToken(resp.token);

    const user = new User()
      .fromJson({ name: resp.username })
      .setRoles(castRoles(resp.roles));

    this.user$.setUser(user);

    if (this.auth$.redirectUrl) {
      this.router.navigate([this.auth$.redirectUrl]);
      this.auth$.redirectUrl = null;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  private loginError(error) {
    this.loginForm.setErrors({
      invalidCredentials: error.message,
    });
    this.setIsLoading(false);
  }
}
