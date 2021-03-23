import { Component, OnInit } from '@angular/core';
import { QSidemenuService } from '@qbitartifacts/qbit-kit-ng';
import { QEventsService } from 'src/app/services/events.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'caste-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public environment = environment;

  constructor(
    public events: QEventsService,
    public sidemenu$: QSidemenuService
  ) {}

  public toggleSidemenu() {
    this.sidemenu$.toggle();
  }
}
