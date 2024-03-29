/**
 * Copyright (c) 2019 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */

import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

export const TRANSLATED_STRING = '';

export class TranslateServiceMock {
  onLangChangeSubject: Subject<LangChangeEvent> = new Subject();
  onTranslationChangeSubject: Subject<string> = new Subject();
  onDefaultLangChangeSubject: Subject<string> = new Subject();
  isLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  onLangChange: Observable<
    LangChangeEvent
  > = this.onLangChangeSubject.asObservable();
  onTranslationChange: Observable<
    string
  > = this.onTranslationChangeSubject.asObservable();
  onDefaultLangChange: Observable<
    string
  > = this.onDefaultLangChangeSubject.asObservable();
  isLoaded: Observable<boolean> = this.isLoadedSubject.asObservable();

  currentLang: string;

  languages: string[] = ['de'];

  get(content: string): Observable<string> {
    return of(TRANSLATED_STRING + content);
  }

  use(lang: string): void {
    this.currentLang = lang;
    this.onLangChangeSubject.next({ lang } as LangChangeEvent);
  }

  addLangs(langs: string[]): void {
    this.languages = [...this.languages, ...langs];
  }

  getBrowserLang(): string {
    return '';
  }

  getLangs(): string[] {
    return this.languages;
  }

  // tslint:disable-next-line:no-any
  getTranslation(): Observable<any> {
    return of({});
  }

  instant(key: string | string[], interpolateParams?: object): string {
    return TRANSLATED_STRING + key.toString();
  }

  setDefaultLang(lang: string): void {
    this.onDefaultLangChangeSubject.next(lang);
  }
}

@Pipe({ name: 'translate' })
export class TranslateMockPipe implements PipeTransform {
  transform(text: string): string {
    return !text ? TRANSLATED_STRING : `${text}-${TRANSLATED_STRING}`;
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]',
})
// tslint:disable:no-any
export class TranslateMockDirective implements AfterViewChecked {
  @Input()
  translateParams: any;
  constructor(private readonly _element: ElementRef) {}

  ngAfterViewChecked(): void {
    this._element.nativeElement.innerText += TRANSLATED_STRING;
  }
}

@NgModule({
  declarations: [TranslateMockPipe, TranslateMockDirective],
  exports: [TranslateMockPipe, TranslateMockDirective],
  providers: [{ provide: TranslateService, useClass: TranslateServiceMock }],
})
export class TranslateMockModule {}
