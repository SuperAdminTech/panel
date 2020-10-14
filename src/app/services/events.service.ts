import { Injectable, EventEmitter } from '@angular/core';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { noop } from 'rxjs/internal/util/noop';

@Injectable()
export class QEventsService {
  public events: { [key: string]: EventEmitter<any> } = {};

  public on<T>(name) {
    const event: EventEmitter<T> = new EventEmitter();
    this.events[name] = event;

    return event;
  }

  public off(name) {
    this.events[name].unsubscribe();
    delete this.events[name];
  }

  public find(name): EventEmitter<any> {
    return this.events[name];
  }

  public fire(name, args: any[] = [], done?: () => any) {
    if (this.find(name)) {
      /* istanbul ignore else */
      if (done) {
        this.events[name].observers.unshift(new Subscriber(done, noop, done));
      }

      this.events[name].emit(args);
    }

    return null;
  }
}
