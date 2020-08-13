import { SidemenuComponent } from './../sidemenu/sidemenu.component';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public environment = environment;

  constructor(public events: QEventsService) {}

  public toggleSidemenu() {
    this.events.fire(SidemenuComponent.EVT_TOGGLE_SIDEMENU);
  }
}
