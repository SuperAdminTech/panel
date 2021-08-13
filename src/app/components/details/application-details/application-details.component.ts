import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Application,
  CasteApplicationService,
} from '@qbitartifacts/caste-client-ng';
import { DetailsBaseComponent } from 'src/app/base/details.base';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'caste-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent extends DetailsBaseComponent<any> {
  constructor(
    public applications$: CasteApplicationService,
    public title$: Title,
  ) {
    super();
  }

  getDetailsObservable(): Observable<Application> {
    return this.applications$.getOne(this.id, 'admin');
  }

  /* istanbul ignore next */
  onGotData(data){
    this.title$.setTitle(
      data.name + ' | ' + environment.brand.title
    )
    super.onGotData(data);
  }
}
