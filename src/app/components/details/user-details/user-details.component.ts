import { Component, OnInit, Input } from '@angular/core';
import {
  CasteUsersService,
  UserResponse,
} from '@qbitartifacts/caste-client-ng';
import { mapUser } from 'src/app/pipes/map-user';
import { User } from 'src/app/entities/user';
import { LoadableComponent } from 'src/app/base/loadable.page';

@Component({
  selector: 'caste-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, LoadableComponent {
  @Input() id: string;

  public isLoading: boolean;
  public user: User;

  constructor(private users$: CasteUsersService) {}

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  ngOnInit() {
    this.setIsLoading(true);
    this.users$
      .getOne(this.id)
      .pipe(mapUser)
      .subscribe({
        next: this.gotUserData.bind(this),
        error: this.errorUserData.bind(this),
      });
  }

  gotUserData(user: User) {
    this.user = user;
    this.setIsLoading(false);
    console.log('got user', user);
  }

  errorUserData(err) {
    console.log('got user err', err);
  }
}
