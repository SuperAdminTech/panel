import { castRoles, User } from '@qbitartifacts/caste-client-ng';
import { map } from 'rxjs/internal/operators/map';

/* istanbul ignore next */
export const mapUsers = map((resp: any) => {
  const users = resp.data;

  resp.data = users.map((user) =>
    new User().fromJson(user).setRoles(castRoles(user.roles))
  );

  return resp;
});
