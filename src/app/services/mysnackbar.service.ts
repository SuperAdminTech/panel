import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { zip } from 'rxjs/internal/observable/zip';

@Injectable()
export class MySnackBarService {
  public static DEFAULT_OPTS = {
    duration: 6e3,
  };
  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {}

  /* istanbul ignore next */
  public open(
    message: string,
    action: string = 'OK',
    options?: MatSnackBarConfig
  ) {
    options = { ...options, ...MySnackBarService.DEFAULT_OPTS };
    return zip(
      this.translate.get(message),
      this.translate.get(action)
    ).subscribe((resp) => {
      const [msg, okMsg] = resp;
      this.snackbar.open(msg, okMsg, options);
    });
  }
}
