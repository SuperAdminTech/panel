import { AppModule } from './../../../app.module';
import { async, TestBed } from '@angular/core/testing';
import { KeyValueItem } from './kvp-item';

describe('KeyValueItem', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(KeyValueItem);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
