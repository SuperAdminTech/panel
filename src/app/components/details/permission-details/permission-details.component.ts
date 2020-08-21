import { Component, OnInit } from '@angular/core';
import { CastePermissionsService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-permissions-details',
  templateUrl: './permissions-details.component.html',
  styleUrls: ['./permissions-details.component.scss'],
})
export class PermissionsDetailsComponent implements OnInit {
  constructor(public permissions$: CastePermissionsService) {}

  ngOnInit() {}
}
