import { TranslateServiceMock } from './../../testing/mocks/ngx-translate.mock';
import { async, TestBed } from '@angular/core/testing';
import { DashChart } from './dash-chart.component';
import { TranslateService } from '@ngx-translate/core';

describe('DashChart', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashChart],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(DashChart);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
