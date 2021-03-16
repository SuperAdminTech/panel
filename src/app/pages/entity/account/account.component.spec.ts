import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { AppModule } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

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
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
