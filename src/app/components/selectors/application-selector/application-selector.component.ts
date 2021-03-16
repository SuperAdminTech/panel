import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CasteApplicationService } from '@qbitartifacts/caste-client-ng';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'caste-application-selector',
  templateUrl: './application-selector.component.html',
  styleUrls: ['./application-selector.component.scss'],
})
export class ApplicationSelectorComponent implements OnInit {
  public applications: any[] = [];
  @Input() public application: any = null;
  @Output() public applicationChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  public applicationQuery: string;

  constructor(public applications$: CasteApplicationService) {}

  /* istanbul ignore next */
  select(application) {
    this.application = application;
    this.applicationChange.emit(application);
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
    this.applications$.listAll({ name: query }, 'admin').subscribe({
      next: (resp: any) => {
        this.applications = resp.data;
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
