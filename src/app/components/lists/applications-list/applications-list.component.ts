import { Component } from '@angular/core';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteApplicationService,
  Application,
} from '@qbitartifacts/caste-client-ng';
import { TableBase } from 'src/app/base/table.page';
import { PermissionAdmin } from 'src/app/permissions';
import { DialogsService } from 'src/app/services/dialogs.service';
import { CreateDialogStatus } from 'src/app/enums/create-dialog-status';
import { DeleteDialogStatus } from 'src/app/enums/delete-dialog-status';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends TableBase<Application> {
  public displayedColumns: string[] = [
    'id',
    'name',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    private applications$: CasteApplicationService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.applications$.listAll(queryParams);
  }

  addApplication() {
    this.dialogs
      .openAddApplication()
      .afterClosed()
      .subscribe((resp) => {
        if (resp === CreateDialogStatus.CREATED) {
          this.onSearch(this.query);
        }
      });
  }

  removeApplication(id: string) {
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
    this.applications$.remove(id).subscribe({
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
