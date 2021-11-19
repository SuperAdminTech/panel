import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthedGuard } from 'src/app/guards/authed.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ItemPageBaseComponent } from 'src/app/base/item.page.base';
import { ActivatedRoute } from '@angular/router';
import { CasteUsersService, User } from '@qbitartifacts/caste-client-ng';
import { mapUser } from 'src/app/pipes/map-user';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'caste-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends ItemPageBaseComponent {
  static guards: any[] = [AuthedGuard, AdminGuard];
  public title = 'USER';
  public user: Observable<User>;

  public permissionTableOptions = {
    showLoading: true,
    showBreadcrumbs: false,
  };

  constructor(
    public title$: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute,
    public users$: CasteUsersService
  ) {
    super(title$, translate$, route);
  }

  ngOnInit() {
    this.user = this.users$.getOne(this.itemId).pipe(mapUser);
  }
}
