import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteApplicationService,
  Application,
} from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends TableBase<Application>
  implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'created_at',
    'updated_at',
  ];
  public searchableColumns = ['name', 'id'];

  constructor(
    public hotkeys: HotkeysService,
    private applications$: CasteApplicationService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.applications$.listAll(queryParams);
  }

  ngOnInit() {}
}
