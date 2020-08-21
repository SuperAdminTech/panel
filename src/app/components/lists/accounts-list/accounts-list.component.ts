import { User } from '../../../entities/user';
import { Component, OnInit } from '@angular/core';
import {
  generateName,
  generateEmail,
  generateLastName,
  generateRole,
} from 'src/app/testing/generators.mock';
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

  constructor(
    public hotkeys: HotkeysService,
    private accounts$: CasteAccountsService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.accounts$.listAll().subscribe(
      (resp) => {
        this.setData(resp);
        console.log(resp);
      },
      (error) => {}
    );
  }

  ngOnInit() {}
}
