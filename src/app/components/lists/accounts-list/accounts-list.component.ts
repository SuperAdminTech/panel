import { Component, Input } from '@angular/core';
import {
  Account,
  CasteAccountsService,
  CasteApplicationService,
  IApplication,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {
  QEventsService,
  QSnackBar,
  QTableListHeaderOptions,
} from '@qbitartifacts/qbit-kit-ng';
import { TablePageBase } from 'src/app/base/table-base.service';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
})
export class AccountsListComponent extends TablePageBase<Account> {
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
  @Input() public parentApplication: IApplication;

  public tableOptions: QTableListHeaderOptions = {
    showLoading: true,
    showBreadcrumbs: true,
  };

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
    super(app, snackbar, events, router, route);
    this.initialSearch = true;
    this.autoRefresh = false;
  }

  ngOnInit() {
    super.ngOnInit();
    this.tableOptions.showBreadcrumbs = this.showBreadcrumbs;
  }

  public getSearchObservable(queryParams) {
    return this.accounts$.listAll(
      { ...queryParams, ...this.searchFilters },
      'admin'
    );
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
      .openAddAccount({
        application: this.parentApplication,
      })
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }

  public editAccount(account) {
    this.dialogs
      .openEditAccount({ account: account })
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
