import { AdminGuard } from '../../../guards/admin.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthedGuard } from 'src/app/guards/authed.guard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'caste-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent
  extends PageBaseComponent
  implements AfterContentInit {
  static guards: any[] = [AuthedGuard, AdminGuard];
  public title = 'PERMISSIONS';

  constructor(
    title: Title,
    translate$: TranslateService,
    public route: ActivatedRoute
  ) {
    super(title, translate$, route);
  }
}
