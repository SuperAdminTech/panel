import { SHORTCUTS } from 'src/config/shortcuts';
// import { HotkeysService } from 'projects/hotkeys/src/public-api';
import { LoadableComponent } from './loadable.page';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';

@Component({
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export abstract class TableBase<T> implements LoadableComponent {
  abstract displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<T>;
  public isLoading = false;

  constructor(public hotkeys: HotkeysService) {
    this.registerHotkeys();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public abstract onSearch(): void;

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public setData(data: T[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      console.log('go to prev page');
      this.paginator.previousPage();
    }
  }

  /* istanbul ignore next*/
  public nextPage() {
    if (this.paginator.hasNextPage()) {
      console.log('go to next page');
      this.paginator.nextPage();
    }
  }
}
