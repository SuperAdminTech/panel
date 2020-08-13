import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kvp-item',
  styleUrls: ['./kvp-item.scss'],
  templateUrl: './kvp-item.html',
})
export class KeyValueItem {
  @Input() public key: string;
  @Input() public value: string;
  @Input() public active: string;

  @Input() public canMoveDown = true;
  @Input() public canMoveUp = true;
  @Input() public canRemove = true;
  @Input() public showCheckbox = true;

  @Input() public editKey = true;
  @Input() public editValue = true;


  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Output() public keyChange: EventEmitter<any> = new EventEmitter();
  @Output() public activeChange: EventEmitter<any> = new EventEmitter();

  @Output() public onChange: EventEmitter<any> = new EventEmitter();
  @Output() public onRemove: EventEmitter<any> = new EventEmitter();
  @Output() public onNewLine: EventEmitter<any> = new EventEmitter();
  @Output() public onUp: EventEmitter<any> = new EventEmitter();
  @Output() public onDown: EventEmitter<any> = new EventEmitter();

  /* istanbul ignore next */
  public newLine() {
    this.onNewLine.emit();
  }

  /* istanbul ignore next */
  public up() {
    this.onUp.emit();
  }

  /* istanbul ignore next */
  public down() {
    this.onDown.emit();
  }

  /* istanbul ignore next */
  public changedKey() {
    this.keyChange.emit(this.key);
    this.onChange.emit({
      key: this.key,
      value: this.value,
      active: this.active,
    });
  }

  /* istanbul ignore next */
  public changedValue() {
    this.valueChange.emit(this.value);
    this.onChange.emit({
      key: this.key,
      value: this.value,
      active: this.active,
    });
  }

  /* istanbul ignore next */
  public changedActive() {
    this.activeChange.emit(this.active);
    this.onChange.emit({
      key: this.key,
      value: this.value,
      active: this.active,
    });
  }

  /* istanbul ignore next */
  public remove() {
    this.onRemove.emit();
  }
}
