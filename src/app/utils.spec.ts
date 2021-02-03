import { LOCALES } from './consts';
import { TestBed, async } from '@angular/core/testing';
import { getLocale } from './utils';

describe('AppComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));

  it('should work if browser lang is supported', () => {
    expect(
      getLocale({
        languages: ['es'],
      })
    ).toEqual(LOCALES.es);
  });

  it('should return default if browser lang is NOT supported', () => {
    expect(
      getLocale({
        languages: ['br'],
      })
    ).toEqual(LOCALES.default);
  });
});
