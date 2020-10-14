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
    'name',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    public applications$: CasteApplicationService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys, snackbar, dialogs);
  }

  public getSearchObservable(queryParams) {
    return this.applications$.listAll(queryParams, 'admin');
  }

  public getRemoveItemObservable(id: string) {
    return this.applications$.remove(id, 'admin');
  }

  addApplication() {
    this.dialogs
      .openAddApplication()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
