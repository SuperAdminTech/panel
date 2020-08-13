import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule, LOCALE_ID } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { getLocale } from './utils';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

const LOCALE = getLocale(navigator);

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
      },
    }),
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: LOCALE,
    },
  ],
})
export class TranslationsModule {}
