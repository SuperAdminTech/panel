import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'caste-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  public users: any[] = [];
  @Input() public user: any = null;
  @Output() public userChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  public userQuery: string;

  constructor(public users$: CasteUsersService) {}

  /* istanbul ignore next */
  selectUser(user) {
    this.user = user;
    this.userChange.emit(user);
    console.log('selectIser', user);
  }

  ngOnInit() {
    setTimeout(() => {
      this.setupDebouncedSearch(this.searchElement.nativeElement);
    });
    this.search();
  }

  /* istanbul ignore next */
  public search(query?: string) {
    this.users$.listAll({ name: query }, 'admin').subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {},
    });
  }

  /* istanbul ignore next */
  public setupDebouncedSearch(element) {
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
