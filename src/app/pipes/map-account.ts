import { map } from 'rxjs/internal/operators/map';
import { Account } from '@qbitartifacts/caste-client-ng';

/* istanbul ignore next */
export const mapAccount = map((account: Account) => {
  return account;
});
