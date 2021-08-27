import { Component, Input } from '@angular/core';
import {
  CastePermissionsService,
  CasteUsersService,
  IPermission,
  Permission,
  PermissionAdmin,
  PermissionSuperAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {
  QSnackBar,
  QEventsService,
  QTableListHeaderOptions,
} from '@qbitartifacts/qbit-kit-ng';
import { TablePageBase } from 'src/app/base/table-base.service';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends TablePageBase<Permission> {
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

  @Input() public tableOptions: QTableListHeaderOptions = {
    showLoading: true,
    showBreadcrumbs: true,
  };
  @Input() public searchFilters = {};
  @Input() public hiddenFilters = [];

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
    super(app, snackbar, events, router, route);
    this.initialSearch = true;
    this.autoRefresh = true;
  }

  ngOnInit() {
    this.hiddenFilters = Object.keys(this.searchFilters);
    super.ngOnInit();
  }

  public getSearchObservable(queryParams) {
    return this.permissions$.listAll(
      { ...queryParams, ...this.searchFilters },
      this.app.getUserType()
    );
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

  public permissionClicked(permission: IPermission) {
    this.dialogs
      .openEditPermission(permission)
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }

  public addPermission() {
    this.dialogs
      .openAddPermission()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
