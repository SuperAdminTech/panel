import { AppService } from './../../services/app.service';
import { MaterialModule } from './../../material.module';
import { LangSelectorComponent } from './lang.selector';
import { async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LOCALES, LANG_METADATA } from 'src/app/consts';

describe('LangSelectorComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, TranslateModule.forRoot()],
      declarations: [LangSelectorComponent],
      providers: [AppService],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LangSelectorComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should work aftrer change detection', () => {
    const fixture = TestBed.createComponent(LangSelectorComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set language correctly on init', () => {
    const fixture = TestBed.createComponent(LangSelectorComponent);
    const app$: AppService = TestBed.get(AppService);
    app$.lang = LOCALES.en;

    fixture.componentInstance.lang = null;
    fixture.detectChanges();

    expect(fixture.componentInstance.lang).toEqual(LANG_METADATA[app$.lang]);
  });

  it('should set language correctly by method', () => {
    const { componentInstance } = TestBed.createComponent(
      LangSelectorComponent
    );

    const langString = 'es';
    componentInstance.selectLang(LANG_METADATA[langString]);

    expect(componentInstance.lang).toEqual(LANG_METADATA[langString]);
    expect(componentInstance.translate.defaultLang).toEqual(langString);
  });
});
