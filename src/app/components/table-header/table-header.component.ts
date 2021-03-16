import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

export interface TableListHeaderOptions {
  input?: boolean;
  refresh?: boolean;
  search?: boolean;
  newItem?: boolean;
  showOptions?: boolean;
  deepLinkQuery?: boolean;
}

const defaultOptions: TableListHeaderOptions = {
  input: true,
  search: false,
  refresh: true,
  newItem: false,
  showOptions: false,
  deepLinkQuery: false,
};

@Component({
  selector: 'caste-table-header',
  templateUrl: './table-header.html',
})
export class TableHeaderComponent implements OnInit {
  @Input() public options: TableListHeaderOptions = {};
  @Input() public title = 'TableList';
  @Input() public query = '';
  @Input() public searchPlaceholder = 'Search';
  @Input() public inputClass = 'input border-radius-2';

  @Input() public newItemText = '';
  @Input() public newItemIcon = 'fa-plus';
  @Input() public searching = false;
  @Input() public searchMapping = [];
  @Input() public showBreadcrumbs = true;
  @Input() public doInitialSearch = false;

  @Output() public onSearch: EventEmitter<any>;
  @Output() public queryChange: EventEmitter<any>;

  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  public queryId: any = '';

  constructor(public router: Router, public route: ActivatedRoute) {
    this.onSearch = new EventEmitter<string>();
    this.queryChange = new EventEmitter<string>();

    this.options = {
      ...defaultOptions,
      ...this.options,
    };
  }

  public ngOnInit() {
    // Setup debound and params
    setTimeout(() => {
      if (this.options.input) {
        this.setupDebouncedSearch(this.searchElement.nativeElement);
      }

      if (this.doInitialSearch) {
        this.search();
      }
    });
  }

  public search() {
    this.queryChange.emit(this.query || '');
    if (this.queryId && this.query) {
      this.onSearch.emit({
        [this.queryId.property]: this.query,
      });
    } else {
      this.onSearch.emit();
    }
  }

  public clear() {
    this.query = '';
    this.search();
  }

  public queryTypeChanged($event) {
    this.queryId = $event;
    this.search();
  }

  public setupDebouncedSearch(element) {
    fromEvent(element, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.query = text;
        this.search();
      });
  }
}
