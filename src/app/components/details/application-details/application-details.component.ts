import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Application,
  CasteApplicationService,
} from '@qbitartifacts/caste-client-ng';
import { DetailsBaseComponent } from 'src/app/base/details.base';

@Component({
  selector: 'caste-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent extends DetailsBaseComponent<any> {
  constructor(public applications$: CasteApplicationService) {
    super();
  }

  getDetailsObservable(): Observable<Application> {
    return this.applications$.getOne(this.id, 'admin');
  }
}
