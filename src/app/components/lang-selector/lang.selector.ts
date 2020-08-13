import { AppService } from './../../services/app.service';
import {
  LOCALES,
  ALL_LOCALES,
  LANG_METADATA,
  LangMetadata,
} from './../../consts';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang.selector.html',
})
export class LangSelectorComponent implements OnInit {
  @Input() public langs: LangMetadata[] = ALL_LOCALES.map(
    (lang) => LANG_METADATA[lang]
  );
  @Input() public lang: LangMetadata = LANG_METADATA[LOCALES.default];
  @Output() public langChanged: EventEmitter<string> = new EventEmitter();

  constructor(public translate: TranslateService, public app$: AppService) {
    this.setLang(app$.lang);
  }

  public setLang(lang: string) {
    this.lang = LANG_METADATA[lang];
  }

  public ngOnInit() {
    if (!this.lang) {
      this.setLang(this.app$.lang);
    }
  }

  public selectLang(lang: LangMetadata) {
    this.lang = lang;
    this.app$.lang = lang.abrev;
    this.translate.use(lang.abrev);
    localStorage.setItem(LOCALES.storageKey, lang.abrev);
    this.langChanged.emit(lang.abrev);
  }
}
