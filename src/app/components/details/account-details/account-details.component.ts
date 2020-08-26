import { Component, Input } from '@angular/core';
import {
  CasteAccountsService,
  AccountResponse,
} from '@qbitartifacts/caste-client-ng';
import { DetailsBaseComponent } from 'src/app/base/details.base';
import { mapAccount } from 'src/app/pipes/map-account';

@Component({
  selector: 'caste-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent extends DetailsBaseComponent<
  AccountResponse
> {
  @Input() id: string;

  constructor(private accounts$: CasteAccountsService) {
    super();
  }

  getDetailsObservable() {
    return this.accounts$.getOne(this.id).pipe(mapAccount);
  }
}
