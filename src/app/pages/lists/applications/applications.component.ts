import { AdminGuard } from '../../../guards/admin.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthedGuard } from 'src/app/guards/authed.guard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'caste-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent
  extends PageBaseComponent
  implements AfterContentInit {
  static guards: any[] = [AuthedGuard, AdminGuard];
  public title = 'APPLICATIONS';

  constructor(
    title: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute
  ) {
    super(title, translate$, route);
  }
}
