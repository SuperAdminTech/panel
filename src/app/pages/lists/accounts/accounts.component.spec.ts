import { AccountsComponent } from './accounts.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
    }).compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
