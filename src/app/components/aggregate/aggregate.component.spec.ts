import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateComponent } from './aggregate.component';
import { By } from '@angular/platform-browser';

describe('AggregateComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [AggregateComponent],
      imports: [AppModule]
    }).compileComponents();
  }));


  it('should create', () => {
    const fixture = TestBed.createComponent(AggregateComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AggregateComponent);
    fixture.componentInstance.title = 'test';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.aggregate-title'));
    expect(titleEl.nativeElement.textContent).toEqual('test');
  });

  it('should render value', () => {
    const fixture = TestBed.createComponent(AggregateComponent);
    fixture.componentInstance.value = 'test';
    fixture.detectChanges();

    const valueEl = fixture.debugElement.query(By.css('.aggregate-value'));
    expect(valueEl.nativeElement.textContent).toEqual('test');
  });
});
