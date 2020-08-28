import { AppModule } from 'src/app/app.module';
import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TableBase } from './table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { Observable, of } from 'rxjs';
import { DialogsService } from '../services/dialogs.service';
import { MySnackBarService } from '../services/mysnackbar.service';
import { CreateDialogStatus } from '../enums/create-dialog-status';

@Component({
  template: '',
})
class TestPage extends TableBase<any> {
  public displayedColumns: string[];

  constructor(
    public hotkeys: HotkeysService,
    public dialogs: DialogsService,
    public snackbar: MySnackBarService
  ) {
    super(hotkeys, snackbar, dialogs);
  }

  public getSearchObservable(queryParams: {
    [key: string]: string;
  }): Observable<any> {
    return of('test');
  }

  getRemoveItemObservable(id: string): Observable<any> {
    return of('test');
  }

  public onSearch(): void {}
}

describe('PageBaseComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TestPage],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TestPage);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('setIsLoading', () => {
    const fixture = TestBed.createComponent(TestPage);
    const component = fixture.componentInstance;

    component.setIsLoading(true);

    expect(component.isLoading).toEqual(true);
  });

  it('setData', () => {
    const fixture = TestBed.createComponent(TestPage);
    const component = fixture.componentInstance;
    component.setData([]);

    expect(component.dataSource.data).toEqual([]);
  });

  it('addAccountNext should search after CreateDialogStatus is CREATED', () => {
    const fixture = TestBed.createComponent(TestPage);
    const component = fixture.componentInstance;

    component.onSearch = () => {};

    spyOn(component, 'onSearch');

    component.onNewItemAdded(CreateDialogStatus.CREATED);

    expect(component.onSearch).toHaveBeenCalled();
  });

  it('addAccountNext should not search if CreateDialogStatus is not CREATED', () => {
    const fixture = TestBed.createComponent(TestPage);
    const component = fixture.componentInstance;

    component.onSearch = () => {};

    spyOn(component, 'onSearch');

    component.onNewItemAdded(CreateDialogStatus.CANCELED);

    expect(component.onSearch).not.toHaveBeenCalled();
  });
});
