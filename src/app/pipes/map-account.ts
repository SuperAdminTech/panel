import { map } from 'rxjs/internal/operators/map';
import { AccountResponse } from '@qbitartifacts/caste-client-ng';

export const mapAccount = map((account: AccountResponse) => {
  return account;
});
