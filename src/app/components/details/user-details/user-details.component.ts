import { Component, OnInit } from '@angular/core';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  constructor(public users$: CasteUsersService) {}

  ngOnInit() {}
}
