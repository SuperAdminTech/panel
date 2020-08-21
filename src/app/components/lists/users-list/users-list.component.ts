import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';
import { castRoles } from 'src/app/roles';
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

  constructor(
    public hotkeys: HotkeysService,
    private users$: CasteUsersService
  ) {
    super(hotkeys);
  }

  public onSearch(query?: string) {
    const queryParams = this.getQueriesForColumns(
      query,
      this.searchableColumns
    );

    this.users$
      .listAll(queryParams)
      .pipe(mapUsers)
      .subscribe((resp) => this.setData(resp));
  }

  ngOnInit() {}
}
