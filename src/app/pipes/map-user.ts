import { castRoles, User } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';

export const mapUser = map((user: any) => {
  return new User()
    .fromJson({
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
    .setRoles(castRoles(user.roles));
});
