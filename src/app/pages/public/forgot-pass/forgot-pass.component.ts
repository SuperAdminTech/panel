import { Component, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CasteUserService } from '@qbitartifacts/caste-client-ng';
import { LoadablePageComponent } from 'src/app/base/loadable.page';
import { PageBaseComponent } from 'src/app/base/page.base';
import { PublicGuard } from 'src/app/guards/public.guard';

@Component({
  selector: 'caste-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent
  extends PageBaseComponent
  implements AfterContentInit, LoadablePageComponent {
  static guards: any[] = [PublicGuard];
  public title = 'Forgot Password';
  public form: FormGroup;
  public isLoading: boolean;
  public sentRecoveryMail = false;

  constructor(
    title: Title,
    route: ActivatedRoute,
    public translate$: TranslateService,
    private user$: CasteUserService,
    private formBuilder: FormBuilder,
  ) {
    super(title, translate$, route);
  }

  public ngAfterContentInit() {
    super.ngAfterContentInit();

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  /* istanbul ignore next */
  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  get username() {
    return this.form.get('username');
  }

  /* istanbul ignore next */
  public onSubmit(): boolean {
    if (this.form.invalid) {
      return false;
    }

    this.setIsLoading(true);

    this.user$.requestPasswordRecovery(this.username.value).subscribe({
      next: this.loginSuccess.bind(this),
      error: this.loginError.bind(this),
    });

    return true;
  }

  /* istanbul ignore next */
  private loginError(error) {
    console.log(error);
    this.form.setErrors({
      error: error.message,
    });
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
  loginSuccess(resp) {
    this.sentRecoveryMail = true;
    this.setIsLoading(false);
  }
}
