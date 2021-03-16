import { Component, Input, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  Account,
  CasteAccountsService,
  CasteApplicationService,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent extends TableBase<Account> {
  public displayedColumns: string[] = [
    'name',
    'application',
    'created_at',
    'updated_at',
    'options',
  ];
  public permissionForAdding = PermissionAdmin;
  @Input() public showAdd = true;
  @Input() public showBreadcrumbs = true;

  constructor(
    public hotkeys: HotkeysService,
    public accounts$: CasteAccountsService,
    public applications$: CasteApplicationService,
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
