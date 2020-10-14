import { map } from 'rxjs/internal/operators/map';
import { User } from '../entities/user';
import { castRoles } from '../roles';

export const mapUsers = map((resp: any) => {
  console.log('resp', resp);
  const users = resp.data;

  resp.data = users.map((user) =>
    new User()
      .fromJson({
        id: user.id,
        name: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      })
      .setRoles(castRoles(user.roles))
  );

  return resp;
});
