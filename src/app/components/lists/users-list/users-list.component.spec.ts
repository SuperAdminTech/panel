import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

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
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get remove observable', () => {
    spyOn(component.users$, 'remove');

    component.getRemoveItemObservable('test');
    expect(component.users$.remove).toHaveBeenCalled();
  });

  it('should get list observable', () => {
    spyOn(component.users$, 'listAll');

    component.getSearchObservable({});
    expect(component.users$.listAll).toHaveBeenCalled();
  });
});
