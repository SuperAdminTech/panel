import { AppModule } from 'src/app/app.module';
import { LOCALES } from './../consts';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from './app.service';

describe('AppService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('should set lang default if not in storage', () => {
    const service: AppService = TestBed.get(AppService);
    localStorage.removeItem(LOCALES.storageKey);

    expect(service.lang).toEqual(LOCALES.default);
  });

  it('should setup language correctly', () => {
    const service: AppService = TestBed.get(AppService);
    service.setUpLang();

    expect(service.translate$.currentLang).toEqual(LOCALES.default);
  });
});
