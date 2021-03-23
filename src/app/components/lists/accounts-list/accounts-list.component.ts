import { Component, Input, OnInit } from '@angular/core';
import {
  Account,
  CasteAccountsService,
  CasteApplicationService,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';
import { QSnackBar, QTableBase } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
})
export class AccountsListComponent extends QTableBase<Account> {
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
  @Input() public searchFilters = {};

  constructor(
    public accounts$: CasteAccountsService,
    public applications$: CasteApplicationService,
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
    return this.accounts$.listAll(queryParams, 'admin');
  }

  public getRemoveItemObservable(id: string) {
    return this.accounts$.remove(id, 'user');
  }

  public getRemoveItemDialog(id: string) {
    return this.dialogs.openConfirmDelete();
  }

  public getOwner(): string {
    return null;
  }

  public addAccount() {
    this.dialogs
      .openAddAccount()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
