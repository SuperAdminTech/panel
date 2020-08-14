import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../components/components.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AccountsComponent } from './accounts/accounts.component';

const pages = [
  DashboardComponent,
  ForgotPassComponent,
  LoginComponent,
  ProfileComponent,
  SignupComponent,
  UserComponent,
  UsersComponent,
  PermissionsComponent,
  ApplicationsComponent,
  AccountsComponent,
];

@NgModule({
  declarations: pages,
  exports: pages,
  imports: [SharedModule, ComponentsModule],
})
export class PagesModule {}