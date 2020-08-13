import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play-stop',
  templateUrl: './play-stop.component.html',
  styleUrls: ['./play-stop.component.scss'],
})
export class PlayStopComponent {
  @Input() state = '';
  @Output() changedState: EventEmitter<string> = new EventEmitter();

  changeState(state: string) {
    this.state = state;
    this.changedState.emit(this.state);
  }
}
