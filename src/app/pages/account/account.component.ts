import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageBaseComponent } from 'src/app/base/page.base';
import { AuthedGuard } from 'src/app/guards/authed.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ItemPageBaseComponent } from 'src/app/base/item.page.base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'caste-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent extends ItemPageBaseComponent {
  static guards: any[] = [AuthedGuard, AdminGuard];
  public title = 'ACCOUNT';

  constructor(
    public title$: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute
  ) {
    super(title$, translate$, route);
  }
}
