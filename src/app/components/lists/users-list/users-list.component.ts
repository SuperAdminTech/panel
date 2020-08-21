import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';
import { castRoles } from 'src/app/roles';

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

  constructor(
    public hotkeys: HotkeysService,
    private users$: CasteUsersService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.users$
      .listAll()
      .pipe(
        map((users) => {
          return users.map((user) =>
            new User()
              .fromJson({
                id: user.id,
                name: user.username,
                created_at: user.created_at,
                updated_at: user.updated_at,
              })
              .setRoles(castRoles(user.roles))
          );
        })
      )
      .subscribe((resp) => this.setData(resp));
  }

  ngOnInit() {}
}
