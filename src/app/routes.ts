import { ForgotPassComponent } from './pages/public/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { UsersComponent } from './pages/lists/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/entity/user/user.component';
import { SignupComponent } from './pages/public/signup/signup.component';
import { AccountsComponent } from './pages/lists/accounts/accounts.component';
import { PermissionsComponent } from './pages/lists/permissions/permissions.component';
import { ApplicationsComponent } from './pages/lists/applications/applications.component';
import { AccountComponent } from './pages/entity/account/account.component';
import { ApplicationComponent } from './pages/entity/application/application.component';
import { VerifyComponent } from './pages/public/verify/verify.component';
import { RecoverComponent } from './pages/public/recover/recover.component';

export const routes: Routes = [
  // public
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: LoginComponent.guards,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: SignupComponent.guards,
  },
  {
    path: 'verify/:user_id',
    component: VerifyComponent,
    canActivate: VerifyComponent.guards,
  },
  {
    path: 'recover/:user_id',
    component: RecoverComponent,
    canActivate: RecoverComponent.guards,
  },
  {
    path: 'forgot-password',
    component: ForgotPassComponent,
    canActivate: ForgotPassComponent.guards,
  },
  // Private
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: DashboardComponent.guards,
    data: {
      breadcrumb: 'DASBHOARD',
    },
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: AccountsComponent.guards,
    data: {
      breadcrumb: 'ACCOUNTS',
    },

    children: [
      {
        path: ':id',
        component: AccountComponent,
        canActivate: AccountComponent.guards,
        data: {
          breadcrumb: 'ACCOUNT',
        },
      },
    ],
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: PermissionsComponent.guards,
    data: {
      breadcrumb: 'PERMISSIONS',
    },
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: ApplicationsComponent.guards,
    data: {
      breadcrumb: 'APPLICATIONS',
    },
    children: [
      {
        path: ':id',
        component: ApplicationComponent,
        canActivate: ApplicationComponent.guards,
        data: {
          breadcrumb: 'APPLICATION',
        },
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: UsersComponent.guards,
    data: {
      breadcrumb: 'USERS',
    },
    children: [
      {
        path: ':id',
        component: UserComponent,
        canActivate: UserComponent.guards,
        data: {
          breadcrumb: 'USER',
        },
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: ProfileComponent.guards,
    data: {
      breadcrumb: 'PROFILE',
    },
  },
];
