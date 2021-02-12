import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionAdmin } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-user-avatar-menu',
  templateUrl: './user-avatar-menu.component.html',
  styleUrls: ['./user-avatar-menu.component.scss'],
})
export class UserAvatarMenuComponent {
  public adminPermission = PermissionAdmin;

  constructor(public user$: UserService, public auth$: AuthService) {}

  /* istanbul ignore next */
  public logout() {
    this.auth$.logout();
  }
}
