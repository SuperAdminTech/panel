import { Component, OnInit } from '@angular/core';
import { QEventsService } from 'src/app/services/events.service';
import { environment } from 'src/environments/environment';
import { SidemenuComponent } from 'src/app/components/sidemenu/sidemenu.component';

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
