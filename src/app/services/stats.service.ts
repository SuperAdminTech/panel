import { Injectable } from '@angular/core';
import { CasteUsersService, CasteAccountsService, CasteApplicationService } from '@qbitartifacts/caste-client-ng';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { countTotal } from '../pipes/count-total';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(
    public users$: CasteUsersService,
    public accounts$: CasteAccountsService,
    public applications$: CasteApplicationService,
  ) { }

  /** Returns total items */
  getStats() {
    const getUsersTotal = this.users$.listAll(null, 'sadmin').pipe(countTotal);
    const getAccountsTotal = this.accounts$.listAll(null, 'admin').pipe(countTotal);
    const getAppsTotal = this.applications$.listAll(null, 'admin').pipe(countTotal);
    
    return forkJoin([getUsersTotal, getAccountsTotal, getAppsTotal])
      .pipe(
        map(([totalUsers, totalAccounts, totalApps]) => {
          return {
            totalUsers, totalAccounts, totalApps
          };
        })
      );
  }
}
