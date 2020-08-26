import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteApplicationService,
  Application,
} from '@qbitartifacts/caste-client-ng';
import { PermissionAdmin } from 'src/app/permissions';
import { DialogsService } from 'src/app/services/dialogs.service';

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
  ];
  public searchableColumns = ['name', 'id'];
  public permissionForAdding = PermissionAdmin;

  constructor(
    public hotkeys: HotkeysService,
    private applications$: CasteApplicationService,
    public dialogs: DialogsService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.applications$.listAll(queryParams);
  }

  addApplication() {
    this.dialogs.openAddApplication();
  }
}
