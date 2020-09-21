import { Component, Input } from '@angular/core';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CastePermissionsService,
  PermissionResponse,
} from '@qbitartifacts/caste-client-ng';
import { TableBase } from 'src/app/base/table.page';
import { PermissionAdmin, PermissionSuperAdmin } from 'src/app/permissions';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { CreateDialogStatus } from 'src/app/enums/create-dialog-status';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends TableBase<PermissionResponse> {
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

  constructor(
    public hotkeys: HotkeysService,
    public permissions$: CastePermissionsService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys, snackbar, dialogs);
  }

  public getSearchObservable(queryParams) {
    return this.permissions$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.permissions$.remove(id, 'sadmin');
  }

  addPermission() {
    this.dialogs
      .openAddPermission()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
