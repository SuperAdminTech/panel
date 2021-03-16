import { VerifyComponent } from './public/verify/verify.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { UserComponent } from './entity/user/user.component';
import { UsersComponent } from './lists/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPassComponent } from './public/forgot-pass/forgot-pass.component';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../components/components.module';
import { PermissionsComponent } from './lists/permissions/permissions.component';
import { ApplicationsComponent } from './lists/applications/applications.component';
import { AccountsComponent } from './lists/accounts/accounts.component';
import { AccountComponent } from './entity/account/account.component';
import { ApplicationComponent } from './entity/application/application.component';
import { RecoverComponent } from './public/recover/recover.component';

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
  ApplicationComponent,
  AccountsComponent,
  AccountComponent,
  VerifyComponent,
  RecoverComponent,
];

@NgModule({
  declarations: pages,
  exports: pages,
  imports: [SharedModule, ComponentsModule],
})
export class PagesModule {}
