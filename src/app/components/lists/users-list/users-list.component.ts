import { Component } from '@angular/core';
import { mapUsers } from 'src/app/pipes/map-users';
import { DialogsService } from 'src/app/services/dialogs.service';
import {
  CasteUsersService,
  PermissionAdmin,
  User,
} from '@qbitartifacts/caste-client-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {
  CreateDialogStatus,
  QEventsService,
  QSnackBar,
  QTableBase,
  QTableListHeaderOptions,
} from '@qbitartifacts/qbit-kit-ng';
import { TablePageBase } from 'src/app/base/table-base.service';

@Component({
  selector: 'caste-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends TablePageBase<User> {
  public displayedColumns: string[] = [
    'name',
    'roles',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name', 'id'];
  public searchPipes = [mapUsers];
  public permissionForAdding = PermissionAdmin;
  public tableOptions: QTableListHeaderOptions = {
    showLoading: true,
    showBreadcrumbs: true,
  };

  constructor(
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
    this.autoRefresh = false;
  }

  public getSearchObservable(queryParams) {
    return this.users$.listAll(
      { ...queryParams, ...this.searchParams },
      'admin'
    );
  }

  public getRemoveItemObservable(id: string) {
    return this.users$.remove(id, 'sadmin');
  }

  public getRemoveItemDialog(id: string) {
    return this.dialogs.openConfirmDelete();
  }

  public getOwner(): string {
    return null;
  }

  /* istanbul ignore next */
  addUser() {
    this.dialogs.openAddUser();
  }

  public editUser(user: User) {
    this.dialogs
      .openEditUser(user)
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }

  public onNewItemAdded(resp) {
    if (resp === CreateDialogStatus.CREATED) {
      this.onSearch(this.searchParams);
    }
  }
}
