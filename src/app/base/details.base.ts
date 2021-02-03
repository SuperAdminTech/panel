import { Component, Input, OnInit } from '@angular/core';
import { LoadableComponent } from './loadable.page';
import { Observable } from 'rxjs/internal/Observable';

@Component({ template: '' })
export abstract class DetailsBaseComponent<T>
  implements LoadableComponent, OnInit {
  @Input() id: string;
  public item: T;
  public isLoading: boolean;

  /* istanbul ignore next */
  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  abstract getDetailsObservable(): Observable<T>;

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.getDetailsObservable().subscribe({
      next: this.onGotData.bind(this),
      error: this.onError.bind(this),
    });
  }

  onGotData(item: T) {
    this.item = item;
    this.setIsLoading(false);
    console.log('got item', item);
  }

  onError(err) {
    console.log('got item err', err);
  }
}
