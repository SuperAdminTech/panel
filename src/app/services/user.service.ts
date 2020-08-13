import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;

  public setUser(user: User) {
    this.user = user;
  }

  public hasUser(): boolean {
    return !!this.user;
  }
}
