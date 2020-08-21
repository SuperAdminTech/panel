import { Component, OnInit } from '@angular/core';
import { CasteApplicationService } from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit {
  constructor(public applications$: CasteApplicationService) {}

  ngOnInit() {}
}
