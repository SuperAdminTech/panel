import { castRoles, User } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';

/* istanbul ignore next */
export const mapUser = map((user: any) => {
  return new User()
    .fromJson(user)
    .setRoles(castRoles(user.roles));
});
