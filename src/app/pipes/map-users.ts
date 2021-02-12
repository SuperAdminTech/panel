import { castRoles, User } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';

export const mapUsers = map((resp: any) => {
  console.log('resp', resp);
  const users = resp.data;

  resp.data = users.map((user) =>
    new User().fromJson(user).setRoles(castRoles(user.roles))
  );

  return resp;
});
