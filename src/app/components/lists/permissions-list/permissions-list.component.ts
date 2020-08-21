import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CastePermissionsService,
  PermissionResponse,
} from '@qbitartifacts/caste-client-ng';
import { PermissionAdmin } from 'src/app/permissions';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends TableBase<PermissionResponse> {
  public displayedColumns: string[] = [
    'id',
    'user',
    'account',
    'grants',
    'updated_at',
  ];
  public searchableColumns = ['id', 'user.username', 'account.name'];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    public permissions$: CastePermissionsService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.permissions$.listAll(queryParams);
  }

  addPermission() {}
}
