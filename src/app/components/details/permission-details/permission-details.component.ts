import { Component, OnInit } from '@angular/core';
import { CastePermissionsService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-permission-details',
  templateUrl: './permission-details.component.html',
  styleUrls: ['./permission-details.component.scss'],
})
export class PermissionsDetailsComponent implements OnInit {
  constructor(public permissions$: CastePermissionsService) {}

  ngOnInit() {}
}
