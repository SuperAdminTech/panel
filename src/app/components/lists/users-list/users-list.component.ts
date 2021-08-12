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
  QEventsService,
  QSnackBar,
  QTableBase,
  QTableListHeaderOptions,
} from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends QTableBase<User> {
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
    super(snackbar, events, router, route);
    this.initialSearch = true;
    this.autoRefresh = false;
  }

  public getSearchObservable(queryParams) {
    return this.users$.listAll(queryParams, 'sadmin');
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
}
