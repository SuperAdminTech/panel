import { AppModule } from './../../../app.module';
import { async, TestBed } from '@angular/core/testing';
import { KeyValuePair, array_move } from './kvp-list';

describe('KeyValuePair', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('array move should work', () => {
    const arr = [0, 1, 2, 3, 4];
    const expected = [1, 0, 2, 3, 4];

    array_move(arr, 0, 1);

    expect(arr).toEqual(expected);
  });

  it('array move should work', () => {
    const arr = [0, 1, 2, 3, 4];
    const expected = [0, 4, 1, 2, 3];

    array_move(arr, -1, 1);
    console.log(arr);

    expect(arr).toEqual(expected);
  });

  it('array move should work', () => {
    const arr = [0, 1, 2, 3, 4];
    const expected = [1, 2, 3, 4, 0];

    array_move(arr, 0, -1);
    console.log(arr);

    expect(arr).toEqual(expected);
  });

  it('array move should work', () => {
    const arr = [0, 1, 2, 3, 4];
    const expected = [1, 2, 3, 4, undefined, undefined, 0];

    array_move(arr, 0, 6);
    console.log(arr);

    expect(arr).toEqual(expected);
  });

  it('newItem should work', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    fixture.componentInstance.newItem();

    expect(fixture.componentInstance.items.length).toEqual(1);
  });

  it('hide should work', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    fixture.componentInstance.hide();

    expect(fixture.componentInstance.hidden).toEqual(true);
  });

  it('unhide should work', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    fixture.componentInstance.hide();
    fixture.componentInstance.unhide();

    expect(fixture.componentInstance.hidden).toEqual(false);
  });

  it('changed should work', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    fixture.componentInstance.newItem();
    fixture.componentInstance.changed(0, {
      key: 'test',
      value: '',
      active: true,
    });

    expect(fixture.componentInstance.items[0]).toEqual({
      key: 'test',
      value: '',
      active: true,
    });
  });

  it('changed should work', () => {
    const fixture = TestBed.createComponent(KeyValuePair);
    fixture.componentInstance.newItem();
    fixture.componentInstance.removeItem(0);
    expect(fixture.componentInstance.items.length).toEqual(0);
  });
});
