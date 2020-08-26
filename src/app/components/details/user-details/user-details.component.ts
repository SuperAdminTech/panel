import { Component, OnInit, Input } from '@angular/core';
import {
  CasteUsersService,
  UserResponse,
} from '@qbitartifacts/caste-client-ng';
import { mapUser } from 'src/app/pipes/map-user';
import { User } from 'src/app/entities/user';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsBaseComponent } from 'src/app/base/details.base';

@Component({
  selector: 'caste-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent extends DetailsBaseComponent<User> {
  @Input() id: string;

  constructor(private users$: CasteUsersService) {
    super();
  }

  getDetailsObservable() {
    return this.users$.getOne(this.id).pipe(mapUser);
  }
}
