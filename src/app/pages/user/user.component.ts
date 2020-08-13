import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageBaseComponent } from 'src/app/base/page.base';
import { AuthedGuard } from 'src/app/guards/authed.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ItemPageBaseComponent } from 'src/app/base/item.page.base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends ItemPageBaseComponent
  implements AfterContentInit, OnInit {
  static guards: any[] = [AuthedGuard, AdminGuard];
  public title = 'USER';

  constructor(
    public title$: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute
  ) {
    super(title$, translate$, route);
  }

  ngOnInit() {
    console.log('Bot id: ', this.itemId);
  }
}
