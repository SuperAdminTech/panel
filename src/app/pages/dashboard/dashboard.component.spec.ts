import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserService } from 'src/app/services/user.service';
import { MUserAdmin } from 'src/app/testing/mocks/users.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.userType).toEqual('...');
  });

  it('should create with user', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    const user: UserService = TestBed.get(UserService);
    user.setUser(MUserAdmin);

    fixture.detectChanges();

    expect(component.userType).toBeTruthy();
    expect(component.userType).toEqual('ADMIN');
  });
});
