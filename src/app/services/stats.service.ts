import { Injectable } from '@angular/core';
import {
  CasteUsersService,
  CasteAccountsService,
  CasteApplicationService,
} from '@qbitartifacts/caste-client-ng';
import { UserType } from '@qbitartifacts/caste-client-ng/lib/types';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { countTotal } from '../pipes/count-total';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    public users$: CasteUsersService,
    public accounts$: CasteAccountsService,
    public applications$: CasteApplicationService
  ) {}

  public getTotalFromRequest(request) {
    return request.pipe(countTotal);
  }

  getTotalUsers(type: UserType = 'sadmin') {
    return this.getTotalFromRequest(this.users$.listAll(null, type));
  }

  getTotalAccounts(type: UserType = 'admin') {
    return this.getTotalFromRequest(this.accounts$.listAll(null, type));
  }

  getTotalApplications(type: UserType = 'sadmin') {
    return this.getTotalFromRequest(this.applications$.listAll(null, type));
  }
}
