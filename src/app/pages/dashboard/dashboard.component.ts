import { PermissionUser } from './../../permissions/index';
import { AuthedGuard } from '../../guards/authed.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import {
  Component,
  AfterContentInit,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DashChart } from 'src/app/components/dash-chart/dash-chart.component';
import { ChartTestData } from 'src/app/testing/mocks/chart.mock';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'caste-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends PageBaseComponent
  implements AfterContentInit, AfterViewInit, OnInit {
  static guards: any[] = [AuthedGuard];
  public title = 'DASHBOARD';
  public permission = PermissionUser;

  @ViewChild('txChartEarnings', { static: true })
  public txChartEarnings: DashChart;

  public userType = '';

  constructor(
    title: Title,
    public translate$: TranslateService,
    public app$: AppService,
    public user$: UserService
  ) {
    super(title, translate$);
  }

  ngOnInit() {
    this.userType = this.user$.user ? this.user$.user.getType() : '...';
  }

  ngAfterViewInit() {
    this.txChartEarnings.update(ChartTestData);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
