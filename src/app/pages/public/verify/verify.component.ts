import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CasteUserService } from '@qbitartifacts/caste-client-ng';
import { QSnackBar } from '@qbitartifacts/qbit-kit-ng';
import { zip } from 'rxjs';
import { LoadablePageComponent } from 'src/app/base/loadable.page';
import { PageBaseComponent } from 'src/app/base/page.base';
import { QEventsService } from 'src/app/services/events.service';

@Component({
  selector: 'caste-verify',
  templateUrl: './verify.component.html',
})
export class VerifyComponent
  extends PageBaseComponent
  implements AfterContentInit, LoadablePageComponent {
  static guards: any[] = [];
  public isLoading: boolean;
  public title = 'VERIFY';
  public verified = false;
  public error: string = null;

  constructor(
    title: Title,
    public translate$: TranslateService,
    public events: QEventsService,
    public activeRoute: ActivatedRoute,
    public userService: CasteUserService,
    public snackbar: QSnackBar,
    public route: ActivatedRoute
  ) {
    super(title, translate$, route);
    zip(this.activeRoute.queryParams, this.activeRoute.params).subscribe(
      ([queryParams, params]) => {
        this.verify(params.user_id, queryParams.code);
      }
    );
  }

  /* istanbul ignore next */
  public verify(userId: string, token: string) {
    this.setIsLoading(true);
    this.userService.verifyEmail(userId, token).subscribe({
      next: this.verifiedOk.bind(this),
      error: this.verifiedError.bind(this),
    });
  }

  /* istanbul ignore next */
  public verifiedOk(res) {
    this.snackbar.open('Verified');
    this.verified = true;
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
  public verifiedError(err) {
    console.log(err);
    this.error = err.message || err['hydra:description'];
    this.verified = false;
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
