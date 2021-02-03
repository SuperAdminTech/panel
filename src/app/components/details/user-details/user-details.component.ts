import { Component, Input } from '@angular/core';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { mapUser } from 'src/app/pipes/map-user';
import { User } from 'src/app/entities/user';
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

  getDetailsObservable(){
    return this.users$.getOne(this.id).pipe(mapUser);
  }
}
