import { User } from './../../../entities/user';
import { Component, OnInit, Inject } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { mapUsers } from 'src/app/pipes/map-users';
import { PermissionAdmin } from 'src/app/permissions';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { DeleteDialogStatus } from 'src/app/enums/delete-dialog-status';

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
    public snackbar: MySnackBarService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.users$.listAll(queryParams, 'admin');
  }

  addUser() {}

  removeUser(id: string) {
    this.dialogs
      .openConfirmDelete()
      .afterClosed()
      .subscribe((resp) => {
        if (resp === DeleteDialogStatus.DELETE) {
          this.removeItem(id);
        }
      });
  }

  removeItem(id: string) {
    this.users$.remove(id, 'sadmin').subscribe({
      next: this.onItemRemoved.bind(this),
      error: this.onItemRemoveError.bind(this),
    });
  }

  onItemRemoved() {
    this.snackbar.open('REMOVED_ITEM');
    this.onSearch(this.query);
  }

  onItemRemoveError(err) {
    this.snackbar.open(err.message || err.detail);
  }
}
