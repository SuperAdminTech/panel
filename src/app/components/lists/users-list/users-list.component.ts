import { User } from './../../../entities/user';
import { Component, OnInit, Inject } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { mapUsers } from 'src/app/pipes/map-users';

@Component({
  selector: 'caste-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends TableBase<User> implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'roles',
    'created_at',
    'updated_at',
  ];
  public searchableColumns = ['name', 'id'];
  public searchPipes = [mapUsers];

  constructor(
    public hotkeys: HotkeysService,
    public users$: CasteUsersService
  ) {
    super(hotkeys);
  }

  public getSearchObservable(queryParams) {
    return this.users$.listAll(queryParams);
  }

  ngOnInit() {}
}
