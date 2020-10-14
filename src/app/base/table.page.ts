import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { SHORTCUTS } from 'src/config/shortcuts';
import { LoadableComponent } from './loadable.page';
import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { Observable } from 'rxjs';
import { DialogsService } from '../services/dialogs.service';
import { DeleteDialogStatus } from '../enums/delete-dialog-status';
import { CreateDialogStatus } from '../enums/create-dialog-status';

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

  // Input properties
  @Input() searchFilters: any = {};

  // Paginator inputs
  public totalItems = 10;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

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

  /* istanbul ignore next */
  public onSearch(query?: string): void {
    this.setIsLoading(true);

    const queryParams = this.getQueriesForColumns(
      query,
      this.searchableColumns
    );

    const params: any = { ...queryParams, ...this.getPaginationParams() };

    let searchObservable = this.getSearchObservable(params);
    const applyPipe = (pipe) =>
      (searchObservable = searchObservable.pipe(pipe));

    if (this.searchPipes && this.searchPipes.length) {
      this.searchPipes.forEach(applyPipe);
    }

    searchObservable.subscribe(
      (resp) => {
        console.log('data', resp);
        this.setData(resp.data);
        this.totalItems = resp.total;
        this.hasData = resp.total > 0;
        this.setIsLoading(false);
      },
      (error) => {
        console.log('err', error);
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
  public onItemRemoved() {
    this.snackbar.open('REMOVED_ITEM');
    this.onSearch(this.query);
  }

  /* istanbul ignore next */
  public onItemRemoveError(err) {
    this.snackbar.open(err.message || err.detail);
  }

  public onNewItemAdded(resp) {
    if (resp === CreateDialogStatus.CREATED) {
      this.onSearch(this.query);
    }
  }

  /* istanbul ignore next */
  public pageChanged($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.onSearch();
  }

  /* istanbul ignore next */
  public getPaginationParams() {
    return {
      itemsPerPage: this.pageSize,
      page: this.pageIndex + 1,
    };
  }
}
