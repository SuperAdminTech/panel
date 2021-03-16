import { Component, AfterContentInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CasteUserService } from '@qbitartifacts/caste-client-ng';
import { zip } from 'rxjs';
import { LoadablePageComponent } from 'src/app/base/loadable.page';
import { PageBaseComponent } from 'src/app/base/page.base';
import { QEventsService } from 'src/app/services/events.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'caste-recover',
  templateUrl: './recover.component.html',
})
export class RecoverComponent
  extends PageBaseComponent
  implements AfterContentInit, LoadablePageComponent, OnInit {
  static guards: any[] = [];
  public isLoading: boolean;
  public title = 'RECOVER';
  public recovered = false;
  public error: string = null;
  public userId: string;
  public code: string;
  public form: FormGroup;

  constructor(
    title: Title,
    public translate$: TranslateService,
    public events: QEventsService,
    public activeRoute: ActivatedRoute,
    public userService: CasteUserService,
    public snackbar: MySnackBarService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {
    super(title, translate$, route);
    zip(this.activeRoute.queryParams, this.activeRoute.params).subscribe(
      ([queryParams, params]) => {
        this.userId = params.user_id;
        this.code = queryParams.code;
      }
    );
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  get password() {
    return this.form.get('password');
  }

  /* istanbul ignore next */
  public onSubmit(): boolean {
    if (this.form.invalid) {
      return false;
    }

    this.setIsLoading(true);
    this.recover(this.userId, this.code, this.password.value);
  }

  /* istanbul ignore next */
  public recover(userId: string, token: string, newPassword) {
    this.setIsLoading(true);
    this.userService.recoverPassword(userId, token, newPassword).subscribe({
      next: this.recoveredOk.bind(this),
      error: this.recoveredError.bind(this),
    });
  }

  /* istanbul ignore next */
  public recoveredOk(res) {
    this.recovered = true;
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
  public recoveredError(err) {
    console.log(err);
    this.form.setErrors({
      error: err.message,
    });
    this.recovered = false;
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
