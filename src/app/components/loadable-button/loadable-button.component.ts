import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loadable-button',
  templateUrl: './loadable-button.component.html',
  styleUrls: ['./loadable-button.component.scss'],
})
export class LoadableButtonComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color = 'primary';
  @Input() id = 'loadable-btn';

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  public onClick() {
    this.clicked.emit();
  }
}
