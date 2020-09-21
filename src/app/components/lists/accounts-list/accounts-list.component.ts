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
import { CreateDialogStatus } from 'src/app/enums/create-dialog-status';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent extends TableBase<AccountResponse> {
  public displayedColumns: string[] = [
    'name',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name'];
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
    return this.accounts$.listAll(
      {
        'sort[created_at]': 'asc',
        ...queryParams,
      },
      'sadmin'
    );
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
