import { PermissionAdmin } from './../../permissions/index';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-avatar-menu',
  templateUrl: './user-avatar-menu.component.html',
  styleUrls: ['./user-avatar-menu.component.scss'],
})
export class UserAvatarMenuComponent implements OnInit {
  public adminPermission = PermissionAdmin;

  constructor(public user$: UserService, public auth$: AuthService) {}

  ngOnInit() {}

  public logout() {
    this.auth$.logout();
  }
}
