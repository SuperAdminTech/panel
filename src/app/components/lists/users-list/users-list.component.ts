import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import {
  generateName,
  generateEmail,
  generateLastName,
  generateRole,
} from 'src/app/testing/generators.mock';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends TableBase<User> implements OnInit {
  displayedColumns: string[] = ['name', 'lastnames', 'email', 'roles'];
  query: string;
  isLoading = false;

  constructor(public hotkeys: HotkeysService) {
    super(hotkeys);
  }

  public onSearch() {}
  public setIsLoading() {}

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
