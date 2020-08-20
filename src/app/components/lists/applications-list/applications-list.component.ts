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
import { CasteApplicationService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent extends TableBase<User>
  implements OnInit {
  public displayedColumns: string[] = ['name', 'lastnames', 'email', 'roles'];

  constructor(
    public hotkeys: HotkeysService,
    private applications: CasteApplicationService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.applications.listAll().subscribe((resp) => {
      console.log(resp);
      // this.setData(resp);
    });
  }

  ngOnInit() {
    const users = Array.from({ length: 100 }, (_, k) => createUser(k + 1 + ''));
    this.setData(users);
  }
}

function createUser(id: string): User {
  const name = generateName();
  return new User().fromJson({
    id,
    name,
    lastnames: generateLastName(),
    email: generateEmail(name),
    birthDate: '',
    roles: generateRole(),
  });
}
