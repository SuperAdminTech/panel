import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassComponent } from './forgot-pass.component';
import { PageBaseComponent } from 'src/app/base/page.base';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPassComponent', () => {
  let component: ForgotPassComponent;
  let fixture: ComponentFixture<ForgotPassComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
