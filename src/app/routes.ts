import { ForgotPassComponent } from './pages/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
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
    path: 'forgot-password',
    component: ForgotPassComponent,
    canActivate: ForgotPassComponent.guards,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: DashboardComponent.guards,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: UsersComponent.guards,
  },
  {
    path: 'users/:id',
    component: UserComponent,
    canActivate: UserComponent.guards,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: ProfileComponent.guards,
  },
];
