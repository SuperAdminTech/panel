import { map } from 'rxjs/internal/operators/map';
import { User } from '../entities/user';
import { castRoles } from '../roles';
import { UserResponse } from '@qbitartifacts/caste-client-ng';

export const mapUsers = map((users: UserResponse[]) => {
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
});
