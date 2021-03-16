import { Component, Input } from '@angular/core';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CastePermissionsService,
  CasteUsersService,
  Permission,
  PermissionAdmin,
  PermissionSuperAdmin,
} from '@qbitartifacts/caste-client-ng';
import { TableBase } from 'src/app/base/table.page';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends TableBase<Permission> {
  public displayedColumns: string[] = [
    'user',
    'account',
    'grants',
    'updated_at',
    'options',
  ];
  public searchableColumns = [];
  public permissionForAdding = PermissionAdmin;
  public permissionForRemoving = PermissionSuperAdmin;
  
  @Input() public showBreadcrumbs = true;

  constructor(
    public hotkeys: HotkeysService,
    public permissions$: CastePermissionsService,
    public users$: CasteUsersService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService,
    public events: QEventsService,
    public app: AppService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(hotkeys, snackbar, dialogs, events, app, router, route);
  }

  public getSearchObservable(queryParams) {
    return this.permissions$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.permissions$.remove(id, 'user');
  }

  addPermission() {
    this.dialogs
      .openAddPermission()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
