import { PermissionSuperAdmin, PermissionUser } from './../../permissions/index';
import { AuthedGuard } from '../../guards/authed.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'caste-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends PageBaseComponent
  implements AfterContentInit, OnInit {
  static guards: any[] = [AuthedGuard];
  public title = 'DASHBOARD';
  public permission = PermissionUser;
  public permissionShowUsers = PermissionSuperAdmin

  public userType = '';
  public stats: { totalUsers?: any; totalAccounts?: any; totalApps?: any; } = {};

  constructor(
    title: Title,
    public translate$: TranslateService,
    public app$: AppService,
    public user$: UserService, 
    public stats$: StatsService
  ) {
    super(title, translate$);
  }

  ngOnInit() {
    this.userType = this.user$.user ? this.user$.user.getType() : '...';
    this.stats$.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
