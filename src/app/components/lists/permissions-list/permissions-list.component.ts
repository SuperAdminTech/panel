import { Component, Input } from '@angular/core';
import {
  CastePermissionsService,
  CasteUsersService,
  Permission,
  PermissionAdmin,
  PermissionSuperAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';
import { QTableBase, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends QTableBase<Permission> {
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
    public permissions$: CastePermissionsService,
    public users$: CasteUsersService,
    public dialogs: DialogsService,
    public snackbar: QSnackBar,
    public events: QEventsService,
    public app: AppService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(snackbar, events, router, route);
  }

  public getSearchObservable(queryParams) {
    return this.permissions$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.permissions$.remove(id, 'user');
  }

  public getRemoveItemDialog(id: string) {
    return this.dialogs.openConfirmDelete();
  }

  public getOwner(): string {
    return null;
  }

  public addPermission() {
    this.dialogs
      .openAddPermission()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
