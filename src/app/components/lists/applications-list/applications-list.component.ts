import { Component } from '@angular/core';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteApplicationService,
  Application,
  PermissionAdmin,
} from '@qbitartifacts/caste-client-ng';
import { TableBase } from 'src/app/base/table.page';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { QEventsService } from 'src/app/services/events.service';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends TableBase<Application> {
  public displayedColumns: string[] = [
    'name',
    'realm',
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
    public snackbar: MySnackBarService,
    public events: QEventsService,
    public app: AppService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(hotkeys, snackbar, dialogs, events, app, router, route);
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
