import { AuthedGuard } from '../../guards/authed.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import { StatsService } from 'src/app/services/stats.service';
import {
  PermissionSuperAdmin,
  PermissionUser,
} from '@qbitartifacts/caste-client-ng';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'caste-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent
  extends PageBaseComponent
  implements AfterContentInit, OnInit
{
  static guards: any[] = [AuthedGuard];
  public title = 'DASHBOARD';
  public permission = PermissionUser;
  public permissionShowUsers = PermissionSuperAdmin;

  public userType = '';

  public usersCount;
  public accountsCount;
  public applicationsCount;

  constructor(
    title: Title,
    route: ActivatedRoute,
    public translate$: TranslateService,
    public app$: AppService,
    public user$: UserService,
    public stats$: StatsService
  ) {
    super(title, translate$, route);
  }

  ngOnInit() {
    this.userType = this.user$.user ? this.user$.user.getType() : '...';

    const userRole = this.user$.isAdmin() ? 'admin' : 'sadmin';
    const params = {
      account_id: this.user$.getAccountId(),
    };

    this.usersCount = this.stats$.getTotalUsers(userRole, params);
    this.accountsCount = this.stats$.getTotalAccounts(userRole, {});
    this.applicationsCount = this.stats$.getTotalApplications(userRole, params);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
