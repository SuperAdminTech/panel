import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AutocompleteListInputComponent } from './autocomplete-list-input.component';

describe('AutocompleteListInputComponent', () => {
  let component: AutocompleteListInputComponent;
  let fixture: ComponentFixture<AutocompleteListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteListInputComponent);
    component = fixture.componentInstance;
    component.allValues = ['test', 'test1', 'test2', 'test3'];
    component.value = ['test'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value change with valid value', () => {
    const subscriber = {
      next: (val) => {},
    };
    const spy = spyOn(subscriber, 'next');

    component.valueChanged.subscribe(subscriber);
    component._addValue('test1');

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit value change with invalid value', () => {
    const subscriber = {
      next: (val) => {},
    };
    const spy = spyOn(subscriber, 'next');

    component.valueChanged.subscribe(subscriber);
    component._addValue('invalid-value');

    expect(spy).not.toHaveBeenCalled();
  });

  it('filter should work', () => {
    const filtered = component._filter('test');
    expect(filtered).toEqual(['test', 'test1', 'test2', 'test3']);

    const filtered1 = component._filter('test1');
    expect(filtered1).toEqual(['test1']);
  });

  it('should emit value change when removing item', () => {
    const subscriber = {
      next: (val) => {},
    };
    const spy = spyOn(subscriber, 'next');

    component.valueChanged.subscribe(subscriber);
    component.remove('test');

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit value change when removing unexistant item', () => {
    const subscriber = {
      next: (val) => {},
    };
    const spy = spyOn(subscriber, 'next');

    component.valueChanged.subscribe(subscriber);
    component.remove('test1');

    expect(spy).not.toHaveBeenCalled();
  });
});
