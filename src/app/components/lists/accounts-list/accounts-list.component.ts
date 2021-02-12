import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  Account,
  CasteAccountsService,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent extends TableBase<Account> {
  public displayedColumns: string[] = [
    'name',
    'created_at',
    'updated_at',
    'options',
  ];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    public accounts$: CasteAccountsService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys, snackbar, dialogs);
  }

  public getSearchObservable(queryParams) {
    return this.accounts$.listAll(queryParams, 'admin');
  }

  public getRemoveItemObservable(id: string) {
    return this.accounts$.remove(id, 'user');
  }

  public addAccount() {
    this.dialogs
      .openAddAccount()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
