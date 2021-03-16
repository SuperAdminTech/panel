import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { SHORTCUTS } from 'src/config/shortcuts';
import { LoadableComponent } from './loadable.page';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { Observable, Subject, timer } from 'rxjs';
import { DialogsService } from '../services/dialogs.service';
import { DeleteDialogStatus } from '../enums/delete-dialog-status';
import { CreateDialogStatus } from '../enums/create-dialog-status';
import { QEventsService } from 'src/app/services/events.service';
import { AppService } from '../services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { createTimer } from '../rxjs/create-timer';

@Component({
  template: '',
})
// tslint:disable-next-line: component-class-suffix
export abstract class TableBase<T> implements LoadableComponent, OnInit {
  abstract displayedColumns: string[] = [];
  public searchableColumns: string[] = [];
  public dataSource: MatTableDataSource<T>;
  public isLoading = false;
  public query = '';
  public searchPipes: any[] = [];
  public hasData = false;
  public searchMapping = [];
  public tableOptions = {};

  @Input() public filterByOwner = false;
  @Input() public owner = null;
  @Input() public userType = 'user';
  @Input() public listType;
  @Input() public createType;
  @Input() public deleteType;
  @Input() public searchFilters = {};
  @Input() public showBreadcrumbs = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // Paginator inputs
  public totalItems = 10;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  // Sort
  public sortId = 'created_at';
  public sortDir: SortDirection = 'desc';

  public isTrader = false;
  public isInvestor = false;
  public isAdmin = false;

  private stopPolling = new Subject();

  constructor(
    public hotkeys: HotkeysService,
    public snackbar: MySnackBarService,
    public dialogs: DialogsService,
    public events: QEventsService,
    public app: AppService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.registerHotkeys();
    this.events
      .on('account:changed')
      .subscribe(this.onAccountChanged.bind(this));
  }

  public setUpTimer() {
    createTimer(
      this.getOnSearchObservable.bind(this),
      this.stopPolling
    ).subscribe({
      next: this.onGotSearchData.bind(this),
      error: (error) => {
        this.hasData = false;
        this.setIsLoading(false);
      },
    });
  }

  ngOnInit() {
    if (!this.listType) this.listType = this.userType;
    if (!this.createType) this.createType = this.userType;
    if (!this.deleteType) this.deleteType = this.userType;

    this.route.queryParams.subscribe((params) => {
      if (params.pageIndex !== undefined) {
        this.pageIndex = Number(params.pageIndex);
      }
      if (params.pageSize !== undefined) {
        this.pageSize = Number(params.pageSize);
      }
      if (params.sortDir !== undefined) {
        this.sortDir = params.sortDir;
      }
      if (params.sortId !== undefined) {
        this.sortId = params.sortId;
      }

      this.sort.direction = this.sortDir;
      this.sort.active = this.sortId;
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
    });

    this.onSearch();
    this.setUpTimer();
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

  abstract getSearchObservable(
    queryParams: {
      [key: string]: string;
    },
    userType?: string
  ): Observable<any>;

  abstract getRemoveItemObservable(
    id: string,
    userType?: string
  ): Observable<any>;

  /* istanbul ignore next */
  public onAccountChanged() {
    this.onSearch();
  }

  /* istanbul ignore next */
  public getOnSearchObservable(searchParams?: any, owner?: string) {
    this.setIsLoading(true);

    const params: any = {
      ...this.getPaginationParams(),
      ...this.getSortParams(),
      ...searchParams,
      ...this.searchFilters,
    };

    if (this.owner) {
      params.account_id = this.owner;
    } else if (owner) {
      params.account_id = owner;
    }

    let searchObservable = this.getSearchObservable(params, this.listType);
    const applyPipe = (pipe) =>
      (searchObservable = searchObservable.pipe(pipe));

    if (this.searchPipes && this.searchPipes.length) {
      this.searchPipes.forEach(applyPipe);
    }

    return searchObservable;
  }

  /* istanbul ignore next */
  public async onSearch(searchParams?: any, owner?: string) {
    this.getOnSearchObservable(searchParams, owner).subscribe({
      next: this.onGotSearchData.bind(this),
      error: (error) => {
        this.hasData = false;
        this.setIsLoading(false);
      },
    });
  }

  /* istanbul ignore next */
  private onGotSearchData(resp) {
    this.totalItems = resp.total || 0;
    this.hasData = this.totalItems > 0;

    // Only set mapping on first load
    if (!this.searchMapping.length) {
      this.searchMapping = resp.search;
    }

    this.setData(resp.data || []);
    this.setIsLoading(false);
  }

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  private removeItem(id: string) {
    this.getRemoveItemObservable(id, this.deleteType).subscribe({
      next: this.onItemRemoved.bind(this),
      error: this.onItemRemoveError.bind(this),
    });
  }

  public setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  public setData(data: T[]) {
    this.dataSource = new MatTableDataSource(data);
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

  /* istanbul ignore next */
  public onNewItemAdded(resp) {
    if (resp === CreateDialogStatus.CREATED) {
      this.onSearch(this.query);
    }
  }

  /* istanbul ignore next */
  public pageChanged($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;

    this.addToQueryParams({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
    this.onSearch();
  }

  /* istanbul ignore next */
  public getPaginationParams() {
    return {
      itemsPerPage: this.pageSize,
      page: this.pageIndex + 1,
    };
  }

  public getSortParams() {
    if (this.sortId) {
      const sortIdKey = `order[${this.sortId}]`;
      return {
        [sortIdKey]: this.sortDir,
      };
    }

    return {};
  }

  public sortChanged($event: Sort) {
    this.sortId = $event.active;
    this.sortDir = $event.direction;

    this.addToQueryParams({
      sortId: this.sortId,
      sortDir: this.sortDir,
    });
    this.onSearch();
  }

  private addToQueryParams(data: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: data,
      queryParamsHandling: 'merge',
    });
  }

  public trackById(index, item: any) {
    return item.id;
  }
}
