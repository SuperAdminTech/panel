import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteListInputComponent } from './autocomplete-list-input.component';

describe('RoleInputComponent', () => {
  let component: AutocompleteListInputComponent;
  let fixture: ComponentFixture<AutocompleteListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteListInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
