import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CasteAccountsService,
  AccountResponse,
} from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent extends TableBase<AccountResponse>
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
    private accounts$: CasteAccountsService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.accounts$.listAll(queryParams);
  }

  ngOnInit() {}
}
