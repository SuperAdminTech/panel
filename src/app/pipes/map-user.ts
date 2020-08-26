import { map } from 'rxjs/internal/operators/map';
import { UserResponse } from '@qbitartifacts/caste-client-ng';
import { User } from '../entities/user';
import { castRoles } from '../roles';

export const mapUser = map((user: UserResponse) => {
  return new User()
    .fromJson({
      id: user.id,
      name: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
      application: user.application as any,
    })
    .setRoles(castRoles(user.roles));
});
