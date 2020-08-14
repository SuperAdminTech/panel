import { Router } from '@angular/router';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PublicGuard } from '../../guards/public.guard';
import { PageBaseComponent } from '../../base/page.base';
import { LoadablePageComponent } from '../../base/loadable.page';
import { CasteAuthService, SignupResponse } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends PageBaseComponent
  implements AfterContentInit, LoadablePageComponent {
  static guards: any[] = [PublicGuard];
  public title = 'Signup';
  public hidePass = true;
  public isLoading = false;

  public signUpForm: FormGroup;
  public submitted = false;
  public signUpSuccess: boolean = null;

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

    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public onSubmit(): boolean {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return false;
    }

    this.setIsLoading(true);

    this.qbitAuth
      .signUp({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe({
        next: this.signupSuccess.bind(this),
        error: this.signupError.bind(this),
      });

    return true;
  }

  /* istanbul ignore next */
  private signupSuccess(resp: SignupResponse) {
    console.log('Signup ok', resp);
    this.signUpSuccess = true;
  }

  /* istanbul ignore next */
  private signupError(error) {
    console.log('error: ', error);
    this.signUpForm.setErrors({
      invalidCredentials: error.detail,
    });
    this.setIsLoading(false);
  }
}
