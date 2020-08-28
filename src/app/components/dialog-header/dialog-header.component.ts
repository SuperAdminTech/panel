import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'caste-dialog-header',
  templateUrl: './dialog-header.component.html',
})
export class DialogHeaderComponent {
  @Input() public title: string;
  @Input() public status = 'blue';
  @Output() public click: EventEmitter<any> = new EventEmitter();
}
