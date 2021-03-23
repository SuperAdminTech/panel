import { Component } from '@angular/core';
import {
  CasteApplicationService,
  Application,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService, QSnackBar, QTableBase } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends QTableBase<Application> {
  public displayedColumns: string[] = [
    'name',
    'realm',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;
  public tableOptions = {
    input: false,
    searchBy: false,
  };

  constructor(
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
    return this.applications$.listAll(queryParams, 'sadmin');
  }

  public getRemoveItemObservable(id: string) {
    return this.applications$.remove(id, 'sadmin');
  }

  public getRemoveItemDialog(id: string) {
    return this.dialogs.openConfirmDelete();
  }

  public getOwner(): string {
    return null;
  }

  addApplication() {
    this.dialogs
      .openAddApplication()
      .afterClosed()
      .subscribe(this.onNewItemAdded.bind(this));
  }
}
