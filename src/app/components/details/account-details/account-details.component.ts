import { Component, OnInit } from '@angular/core';
import { CasteAccountsService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  constructor(public accounts$: CasteAccountsService) {}

  ngOnInit() {}
}
