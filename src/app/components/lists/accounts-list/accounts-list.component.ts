import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteAccountsService,
  AccountResponse,
} from '@qbitartifacts/caste-client-ng';
import { PermissionAdmin } from 'src/app/permissions';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent extends TableBase<AccountResponse> {
  public displayedColumns: string[] = ['name', 'created_at', 'updated_at'];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    private accounts$: CasteAccountsService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys, snackbar, dialogs);
  }

  public getSearchObservable(queryParams) {
    return this.accounts$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.accounts$.remove(id, 'sadmin');
  }

  addAccount() {}
}
