import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCALES } from '../consts';
import { BaseService, DEFAULT_CONFIG } from '@qbitartifacts/caste-client-ng';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

@Injectable({
  providedIn: 'root',
})
export class AppService extends BaseService {
  public lang = LOCALES.es;
  public publicRoute = false;

  constructor(
    public translate$: TranslateService,
    public user$: UserService,
    public events: QEventsService,
    public router: Router,
    public http: HttpClient,
    private auth: AuthService
  ) {
    super(http, {
      ...DEFAULT_CONFIG,
      url: environment.url,
    });
    this.lang = localStorage.getItem(LOCALES.storageKey) || LOCALES.default;
  }

  public getUserRequestRole() {
    return this.user$.isAdmin() ? 'admin' : 'sadmin';
  }

  protected getToken() {
    return this.auth.session && this.auth.session.token;
  }

  public setUpLang() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate$.setDefaultLang(LOCALES.default);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate$.use(this.lang);
  }

  // Public calls
  public getApiVersion() {
    return this.get('/public/versions/current');
  }
}
