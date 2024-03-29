import { RoleUser } from '@qbitartifacts/caste-client-ng';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CASTE_ROLES } from 'src/app/config/roles';
import { QSnackBar } from '@qbitartifacts/qbit-kit-ng';
import { TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'caste-autocomplete-list-input',
  templateUrl: './autocomplete-list-input.component.html',
  styleUrls: ['./autocomplete-list-input.component.scss'],
})
export class AutocompleteListInputComponent implements OnChanges {
  @Input() label = 'SELECT_ROLES';
  @Input() newItemLabel = 'NEW_ROLE';

  @Input() value: string[] = [RoleUser.name];
  @Input() allValues: string[] = CASTE_ROLES.map((role) => role.name);

  @Output() valueChanged: EventEmitter<string[]> = new EventEmitter();
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleFormControl = new FormControl();

  filteredValuesObs: Observable<string[]>;
  filteredValues: string[] = [];

  constructor(
    public readonly snackbar: QSnackBar,
    public readonly translations: TranslateService
  ) {
    this.filteredValuesObs = this.roleFormControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        const filtered = value ? this._filter(value) : this.allValues.slice();

        return (this.filteredValues = filtered);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('allValues' in changes) {
      this.filteredValues = this.allValues.slice();
      this.roleFormControl.setValue('');

      if (this.roleInput) this.roleInput.nativeElement.value = '';

      // Remove invalid values
      for (let item in this.value) {
        if (!this.allValues.includes(item)) {
          this.remove(item);
        }
      }
    }
  }

  // we can ignore this as _addValue is already tested
  /* istanbul ignore next */
  add(event: MatChipInputEvent): void {
    this._addValue((event.value || '').trim());
  }

  remove(fruit: string): void {
    const index = this.value.indexOf(fruit);

    if (index >= 0) {
      this.value.splice(index, 1);
      this.valueChanged.emit(this.value);
    }
  }

  // we can ignore this as _addValue is already tested
  /* istanbul ignore next */
  selected(event: MatAutocompleteSelectedEvent): void {
    this._addValue(event.option.value);
  }

  onTab(event) {
    const lastValue = this.filteredValues[0];
    if (this.roleFormControl.value && lastValue) {
      event.preventDefault();
      this._addValue(lastValue);
    }
  }

  _addValue(value: string) {
    if (
      value &&
      this.allValues.includes(value) &&
      !this.value.includes(value)
    ) {
      this.value.push(value);
      this.valueChanged.emit(this.value);

      this.roleInput.nativeElement.value = '';
      this.roleFormControl.setValue('');
      this.trigger.openPanel();
    }
  }

  _filter(currentValue: string): string[] {
    const filterValue = currentValue.toLowerCase();

    return this.allValues.filter(
      (value) =>
        value.toLowerCase().includes(filterValue) ||
        this.translations.instant(value).toLowerCase().includes(filterValue)
    );
  }
}
