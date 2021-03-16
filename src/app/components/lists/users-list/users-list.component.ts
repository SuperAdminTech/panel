import { Component } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { mapUsers } from 'src/app/pipes/map-users';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import {
  CasteUsersService,
  PermissionAdmin,
  User,
} from '@qbitartifacts/caste-client-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';

@Component({
  selector: 'caste-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends TableBase<User> {
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

  constructor(
    public hotkeys: HotkeysService,
    public users$: CasteUsersService,
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
    return this.users$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.users$.remove(id, 'sadmin');
  }

  /* istanbul ignore next */
  addUser() {}
}
