import { Permission } from 'src/app/entities/permission';
import {
  MUserUser,
  MUserReadOnly,
  MUserAdmin,
} from './../testing/mocks/users.mock';
import { UserService } from './../services/user.service';
import { PermissionUser, PermissionAdmin } from './../permissions/index';
import { PermissionsDirective } from './permissions.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, TemplateRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input id="element" type="text" *appPermissions="perm" />`,
})
class TestPermissionsUserComponent {
  public perm: Permission = PermissionUser;
}

@Component({
  template: `<input id="element" type="text" *appPermissions="perm" />`,
})
class TestPermissionsAdminComponent {
  public perm: Permission = PermissionAdmin;
}

describe('PermissionsDirective', () => {
  let user$: UserService;
  let componentUser: TestPermissionsUserComponent;
  let componentAdmin: TestPermissionsAdminComponent;
  let fixtureUser: ComponentFixture<TestPermissionsUserComponent>;
  let fixtureAdmin: ComponentFixture<TestPermissionsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PermissionsDirective,
        TestPermissionsAdminComponent,
        TestPermissionsUserComponent,
      ],
      providers: [TemplateRef, UserService],
    });

    fixtureUser = TestBed.createComponent(TestPermissionsUserComponent);
    componentUser = fixtureUser.componentInstance;

    fixtureAdmin = TestBed.createComponent(TestPermissionsAdminComponent);
    componentAdmin = fixtureAdmin.componentInstance;

    user$ = TestBed.get(UserService);
  });

  it('should create an instance', () => {
    fixtureUser.detectChanges();
    expect(componentUser).toBeTruthy();
  });

  it('should handle permissions correctly (User with RoleUser and UserPermission) => can activate', () => {
    user$.setUser(MUserUser);
    fixtureUser.detectChanges();

    const elementRef = fixtureUser.debugElement.query(By.css('#element'));
    expect(elementRef instanceof DebugElement).toBeTruthy();
  });

  it('should handle permissions correctly (User with RoleAdmin and UserPermission) => can activate', () => {
    user$.setUser(MUserAdmin);
    fixtureUser.detectChanges();

    const elementRef = fixtureUser.debugElement.query(By.css('#element'));
    expect(elementRef instanceof DebugElement).toBeTruthy();
  });

  it('should handle permissions correctly (User with RoleReadOnly and UserPermission) => cannot activate', () => {
    user$.setUser(MUserReadOnly);
    fixtureUser.detectChanges();

    const elementRef = fixtureUser.debugElement.query(By.css('#element'));
    expect(elementRef instanceof DebugElement).not.toBeTruthy();
  });

  it('should handle permissions correctly (User with RolAdmin and AdminPermission) => can activate', () => {
    user$.setUser(MUserAdmin);
    fixtureAdmin.detectChanges();

    const elementRef = fixtureAdmin.debugElement.query(By.css('#element'));
    expect(elementRef instanceof DebugElement).toBeTruthy();
  });

  it('should handle permissions correctly (User with RolAdmin and AdminPermission) => can activate', () => {
    user$.setUser(MUserUser);
    fixtureAdmin.detectChanges();

    const elementRef = fixtureAdmin.debugElement.query(By.css('#element'));
    console.log('element', elementRef);
    expect(elementRef instanceof DebugElement).not.toBeTruthy();
  });
});
