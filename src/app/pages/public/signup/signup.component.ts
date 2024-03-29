import { Router, ActivatedRoute } from '@angular/router';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { PublicGuard } from '../../../guards/public.guard';
import { PageBaseComponent } from '../../../base/page.base';
import { LoadablePageComponent } from '../../../base/loadable.page';
import {
  CasteAuthService,
  SignupResponse,
} from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent
  extends PageBaseComponent
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
    public qbitAuth: CasteAuthService,
    public route: ActivatedRoute
  ) {
    super(title, translate$, route);
  }

  public ngAfterContentInit() {
    super.ngAfterContentInit();
    this.setRealm();

    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /* istanbul ignore next */
  public setRealm() {
    const realmSaved = localStorage.getItem('realm');
    if (realmSaved) {
      this.qbitAuth.addConfig('realm', realmSaved);
    }
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  /* istanbul ignore next */
  public onSubmit(): boolean {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return false;
    }

    this.setIsLoading(true);

    this.qbitAuth
      .signUp({
        username: this.email.value,
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
    this.signUpSuccess = true;
  }

  /* istanbul ignore next */
  private signupError(error) {
    this.signUpForm.setErrors({
      invalidCredentials: error.detail,
    });
    this.setIsLoading(false);
  }
}
