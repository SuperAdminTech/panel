import { Injectable } from '@angular/core';
import {
  CasteUsersService,
  CasteAccountsService,
  CasteApplicationService,
} from '@qbitartifacts/caste-client-ng';
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

  getTotalUsers() {
    return this.getTotalFromRequest(this.users$.listAll(null, 'sadmin'));
  }

  getTotalAccounts() {
    return this.getTotalFromRequest(this.accounts$.listAll(null, 'admin'));
  }

  getTotalApplications() {
    return this.getTotalFromRequest(this.applications$.listAll(null, 'admin'));
  }
}
