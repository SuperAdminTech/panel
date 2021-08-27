import { Component } from '@angular/core';
import {
  CasteApplicationService,
  Application,
  PermissionAdmin,
  IApplication,
} from '@qbitartifacts/caste-client-ng';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {
  QEventsService,
  QSnackBar,
  QTableListHeaderOptions,
} from '@qbitartifacts/qbit-kit-ng';
import { TablePageBase } from 'src/app/base/table-base.service';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends TablePageBase<Application> {
  public displayedColumns: string[] = [
    'name',
    'realm',
    'created_at',
    'updated_at',
    'options',
  ];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;
  public tableOptions: QTableListHeaderOptions = {
    showLoading: true,
    showBreadcrumbs: true,
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
    super(app, snackbar, events, router, route);
    this.initialSearch = true;
    this.autoRefresh = false;
  }

  public getSearchObservable(queryParams) {
    return this.applications$.listAll(queryParams, this.app.getUserType());
  }

  public getRemoveItemObservable(id: string) {
    return this.applications$.remove(id, 'sadmin');
  }

  public getRemoveItemDialog(id: string) {
    return this.dialogs.openConfirmDelete();
  }

  public openEditApplication(application: IApplication) {
    return this.dialogs.openEditApplication(application);
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
