import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CasteAccountsService } from '@qbitartifacts/caste-client-ng';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'caste-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent implements OnInit {
  public accounts: any[] = [];
  @Input() public account: any = null;
  @Output() public accountChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  public accountQuery: string;

  constructor(public accounts$: CasteAccountsService) {}

  /* istanbul ignore next */
  selectAccount(account) {
    this.account = account;
    this.accountChange.emit(account);
  }

  /* istanbul ignore next */
  ngOnInit() {
    setTimeout(() => {
      this.setupDebouncedSearch(this.searchElement.nativeElement);
    });
    this.search();
  }

  /* istanbul ignore next */
  public search(query?: string) {
    this.accounts$.listAll({ name: query }, 'admin').subscribe({
      next: (resp: any) => {
        this.accounts = resp.data;
      },
      error: (err) => {},
    });
  }

  /* istanbul ignore next */
  public setupDebouncedSearch(element) {
    console.log('setupDebouncedSearch');
    fromEvent(element, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.search(text);
      });
  }
}
