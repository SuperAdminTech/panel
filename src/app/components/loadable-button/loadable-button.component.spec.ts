import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableButtonComponent } from './loadable-button.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-loadable-button>LOGIN</app-loadable-button>`,
})
class TestLoadableButtonComponent {}

describe('LoadableButtonComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadableButtonComponent, TestLoadableButtonComponent],
      imports: [MaterialModule],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LoadableButtonComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set ng-content correctly', () => {
    const testFixture = TestBed.createComponent(TestLoadableButtonComponent);
    const de: DebugElement = testFixture.debugElement.query(
      By.css('.button-content')
    );

    expect(de.nativeElement.textContent).toEqual('LOGIN');
  });

  it('should propagate onClick correctly', async () => {
    const testFixture = TestBed.createComponent(LoadableButtonComponent);
    const mock = {
      sub: (evt) => console.log('clicked'),
    };
    spyOn(mock, 'sub');

    testFixture.detectChanges();

    testFixture.componentInstance.clicked.subscribe(mock.sub);
    testFixture.debugElement
      .query(By.css('#loadable-btn'))
      .nativeElement.click();

    expect(mock.sub).toHaveBeenCalled();
  });
});
