import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCALES } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public lang = LOCALES.es;
  public publicRoute = false;

  constructor(public translate$: TranslateService) {
    this.lang = localStorage.getItem(LOCALES.storageKey) || LOCALES.default;
  }

  public setUpLang() {
    /* istanbul ignore next */
    if (environment.debug) {
      console.log('Setting up language: ' + this.lang);
    }

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate$.setDefaultLang(LOCALES.default);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate$.use(this.lang);
  }
}
