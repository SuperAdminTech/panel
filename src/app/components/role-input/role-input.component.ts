import { Role, RoleUser } from '@qbitartifacts/caste-client-ng';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CASTE_ROLES } from 'src/app/config/roles';

@Component({
  selector: 'caste-role-input',
  templateUrl: './role-input.component.html',
  styleUrls: ['./role-input.component.scss'],
})
export class RoleInputComponent {
  @Input() roles: string[] = [RoleUser.name];
  @Input() allRoles: string[] = CASTE_ROLES.map((role) => role.name);

  @Output() rolesChanged: EventEmitter<string[]> = new EventEmitter();
  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleFormControl = new FormControl();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.roles.push(value);
      this.rolesChanged.emit(this.roles);
    }

    event.input!.value = '';
    this.roleFormControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.roles.indexOf(fruit);

    if (index >= 0) {
      this.roles.splice(index, 1);
      this.rolesChanged.emit(this.roles);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.roles.push(event.option.viewValue);
    this.roleInput.nativeElement.value = '';
    this.roleFormControl.setValue(null);
  }
}
