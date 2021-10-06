import { Component, Input, Output, EventEmitter } from '@angular/core';
export function array_move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing purposes
}

export interface KvpItem {
  key: string;
  value: string;
  active: boolean;
}

@Component({
  selector: 'kvp-list',
  styles: [
    `
      :host {
        display: block;
      }

      .kvp-list-container {
        min-height: 100px
      }
    `,
  ],
  templateUrl: './kvp-list.html',
})
export class KeyValuePair {
  @Input() public items: KvpItem[] = [];
  @Input() public hidden = false;
  @Input() public showCheckboxes = true;
  @Input() public showHidding = true;
  @Input() public showActions = true;
  @Input() public editKeys = true;
  @Input() public editValues = true;
  @Input() public title = 'KVP_ITEMS_SHOWN';


  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onChange: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onReset: EventEmitter<any> = new EventEmitter();
  @Output() public hiddenChange: EventEmitter<any> = new EventEmitter();

  public loading = false;

  /* istanbul ignore next */
  public reset() {
    this.onReset.emit();
  }

  /* istanbul ignore next */
  public trackByFn(index, item) {
    return index; // or item.id
  }

  /* istanbul ignore next */
  public moveItem(index, dir) {
    this.items = array_move(this.items, index, index + dir);
  }

  public newItem() {
    this.items.push({ key: '', value: '', active: true });
    this.onChange.emit(this.items);
  }

  public unhide() {
    this.hidden = false;
    this.hiddenChange.emit(this.hidden);
  }

  public hide() {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

  public changed(i, item) {
    this.items[i] = item;
    this.onChange.emit(this.items);
  }

  public removeItem(i) {
    this.items.splice(i, 1);
    this.onChange.emit(this.items);
  }
}
