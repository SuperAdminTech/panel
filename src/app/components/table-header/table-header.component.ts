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
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';

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
  selector: 'app-table-header',
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

  @Output() public onSearch: EventEmitter<string>;
  @Output() public queryChange: EventEmitter<string>;

  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public hotkeys: HotkeysService
  ) {
    this.onSearch = new EventEmitter<string>();
    this.queryChange = new EventEmitter<string>();

    this.options = {
      ...defaultOptions,
      ...this.options,
    };
  }

  public ngOnInit() {
    setTimeout(() => {
      // this.hotkeys
      //   .addShortcut({
      //     keys: 'shift.r',
      //     description: 'Clears input',
      //     element: this.searchElement.nativeElement,
      //   })
      //   .subscribe((resp) => {
      //     console.log('clear input');
      //   });

      if (this.options.input) {
        this.setupDebouncedSearch(this.searchElement.nativeElement);
      }

      this.route.queryParams.subscribe((params) => {
        if (params.query) {
          this.query = params.query;
          /* istanbul ignore else */
          if (this.searchElement.nativeElement.value !== this.query) {
            this.searchElement.nativeElement.value = this.query;
            this.searchElement.nativeElement.dispatchEvent(new Event('keyup'));
          }
        } else {
          this.search();
        }
      });
    });
  }

  public search() {
    this.queryChange.emit(this.query || '');
    this.onSearch.emit(this.query || '');
  }

  public clear() {
    this.query = '';
    this.search();
  }

  public setupDebouncedSearch(element) {
    console.log('setupDebouncedSearch');
    fromEvent(element, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.query = text;
        this.onSearch.emit(text);
        this.queryChange.emit(text);

        // Add query params for deeplinking
        if (this.options.deepLinkQuery) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              query: this.query,
            },
            queryParamsHandling: 'merge',
          });
        }
      });
  }
}
