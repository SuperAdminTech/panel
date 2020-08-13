import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidColors } from './../../types/index';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent {
  @Input() color: ValidColors = 'primary';
  @Input() icon = 'add';
  @Input() text = 'Add';

  @Output() add: EventEmitter<any> = new EventEmitter();
}
