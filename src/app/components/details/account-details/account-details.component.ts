import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CasteAccountsService, Account } from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus } from '@qbitartifacts/qbit-kit-ng';
import { DetailsBaseComponent } from 'src/app/base/details.base';
import { mapAccount } from 'src/app/pipes/map-account';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'caste-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent extends DetailsBaseComponent<Account> {
  @Input() id: string;
  @Output() onEdit: EventEmitter<Account> = new EventEmitter();

  constructor(
    private accounts$: CasteAccountsService,
    public readonly dialogs: DialogsService
  ) {
    super();
  }

  getDetailsObservable() {
    return this.accounts$.getOne(this.id).pipe(mapAccount);
  }

  /* istanbul ignore next */
  public editAccount() {
    this.dialogs
      .openEditAccount({ account: this.item })
      .afterClosed()
      .subscribe((state) => {
        if (state === CreateDialogStatus.CREATED) this.getDetails();
      });
  }
}
