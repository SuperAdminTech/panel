import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { SHORTCUTS } from 'src/config/shortcuts';
import { LoadableComponent } from './loadable.page';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { Observable } from 'rxjs';
import { DialogsService } from '../services/dialogs.service';
import { DeleteDialogStatus } from '../enums/delete-dialog-status';

@Component({
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export abstract class TableBase<T> implements LoadableComponent {
  abstract displayedColumns: string[] = [];
  public searchableColumns: string[] = [];
  public dataSource: MatTableDataSource<T>;
  public isLoading = false;
  public query = '';
  public searchPipes: any[] = [];
  public hasData = false;

  constructor(
    public hotkeys: HotkeysService,
    public snackbar: MySnackBarService,
    public dialogs: DialogsService
  ) {
    this.registerHotkeys();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  abstract getSearchObservable(queryParams: {
    [key: string]: string;
  }): Observable<any>;

  abstract getRemoveItemObservable(id: string): Observable<any>;

  public onSearch(query?: string): void {
    this.setIsLoading(true);

    const queryParams = this.getQueriesForColumns(
      query,
      this.searchableColumns
    );

    let searchObservable = this.getSearchObservable(queryParams);
    const applyPipe = (pipe) =>
      (searchObservable = searchObservable.pipe(pipe));

    if (this.searchPipes && this.searchPipes.length) {
      this.searchPipes.forEach(applyPipe);
    }

    searchObservable.subscribe(
      (resp) => {
        this.setData(resp);
        this.hasData = resp.length > 0;
        this.setIsLoading(false);
      },
      (error) => {
        this.hasData = false;
        this.setIsLoading(false);
      }
    );
  }

  public openRemoveConfirmation(id: string) {
    this.dialogs
      .openConfirmDelete()
      .afterClosed()
      .subscribe((resp) => {
        if (resp === DeleteDialogStatus.DELETE) {
          this.removeItem(id);
        }
      });
  }

  private removeItem(id: string) {
    this.getRemoveItemObservable(id).subscribe({
      next: this.onItemRemoved.bind(this),
      error: this.onItemRemoveError.bind(this),
    });
  }

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public setData(data: T[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getQueriesForColumns(
    query: string | number | boolean,
    columns: string[]
  ) {
    const params = {};

    if (query) {
      const addParam = (col) => (params[col] = query);
      columns.forEach(addParam);
    }

    return params;
  }

  public registerHotkeys() {
    this.hotkeys
      .addShortcut(SHORTCUTS.table.nextPage)
      .subscribe(this.nextPage.bind(this));

    this.hotkeys
      .addShortcut(SHORTCUTS.table.prevPage)
      .subscribe(this.prevPage.bind(this));
  }

  /* istanbul ignore next*/
  public prevPage() {
    if (this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  /* istanbul ignore next*/
  public nextPage() {
    if (this.paginator.hasNextPage()) {
      this.paginator.nextPage();
    }
  }

  /* istanbul ignore next */
  onItemRemoved() {
    this.snackbar.open('REMOVED_ITEM');
    this.onSearch(this.query);
  }

  /* istanbul ignore next */
  onItemRemoveError(err) {
    this.snackbar.open(err.message || err.detail);
  }
}
