/**
 * @license 
 * QBitArtifacts All rights reserved.
 * 
 * Modified version of the AsyncPipe, which allows normal values to be passed to the pipe.
 * Done so we can treat anything as both promises/observables or raw values.
 * 
 * This way we can always use the AsyncPipe and if it's a promise/observable it will behave in the same way as the original AsyncPipe
 * but if a regular value is passed it will just return the value
 */

import {
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  Pipe,
  PipeTransform,
  ɵisPromise,
  ɵisSubscribable,
} from '@angular/core';
import { Observable, Subscribable, Unsubscribable } from 'rxjs';

import { invalidPipeArgumentError } from './invalid_pipe_argument_error';

interface SubscriptionStrategy {
  createSubscription(
    async: Subscribable<any> | Promise<any>,
    updateLatestValue: any
  ): Unsubscribable | Promise<any>;
  dispose(subscription: Unsubscribable | Promise<any>): void;
  onDestroy(subscription: Unsubscribable | Promise<any>): void;
}

interface RawValueStrategy {
    createSubscription(
      value: any,
      updateLatestValue: any
    ): Unsubscribable | Promise<any>;
    dispose(subscription: Unsubscribable | Promise<any>): void;
    onDestroy(subscription: Unsubscribable | Promise<any>): void;
  }
  

class SubscribableStrategy implements SubscriptionStrategy {
  createSubscription(
    async: Subscribable<any>,
    updateLatestValue: any
  ): Unsubscribable {
    return async.subscribe({
      next: updateLatestValue,
      error: (e: any) => {
        throw e;
      },
    });
  }

  dispose(subscription: Unsubscribable): void {
    subscription.unsubscribe();
  }

  onDestroy(subscription: Unsubscribable): void {
    subscription.unsubscribe();
  }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(
    async: Promise<any>,
    updateLatestValue: (v: any) => any
  ): Promise<any> {
    return async.then(updateLatestValue, (e) => {
      throw e;
    });
  }

  dispose(subscription: Promise<any>): void {}

  onDestroy(subscription: Promise<any>): void {}
}

class ValueStrategy implements RawValueStrategy {
  createSubscription(
    async: any,
    updateLatestValue: (v: any) => any
  ): Promise<any> {
    return Promise.resolve(async).then(updateLatestValue);
  }

  dispose(subscription: Promise<any>): void {}

  onDestroy(subscription: Promise<any>): void {}
}

const _promiseStrategy = new PromiseStrategy();
const _subscribableStrategy = new SubscribableStrategy();
const _valueStrategy = new ValueStrategy();

/**
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
@Pipe({ name: 'asyncp', pure: false })
export class AsyncPlusPipe implements OnDestroy, PipeTransform {
  private _latestValue: any = null;

  private _subscription: Unsubscribable | Promise<any> | null = null;
  private _obj: Subscribable<any> | Promise<any> | EventEmitter<any> | null =
    null;
  private _strategy: SubscriptionStrategy = null!;

  constructor(private _ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }
  }

  // NOTE(@benlesh): Because Observable has deprecated a few call patterns for `subscribe`,
  // TypeScript has a hard time matching Observable to Subscribable, for more information
  // see https://github.com/microsoft/TypeScript/issues/43643

  transform<T>(obj: Observable<T> | Subscribable<T> | Promise<T>): T | null;
  transform<T>(obj: null | undefined): null;
  transform<T>(obj: any): null;
  transform<T>(
    obj: Observable<T> | Subscribable<T> | Promise<T> | null | undefined | any
  ): T | null;
  transform<T>(
    obj: Observable<T> | Subscribable<T> | Promise<T> | null | undefined | any
  ): T | null {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }
      return this._latestValue;
    }

    if (obj !== this._obj) {
      this._dispose();
      return this.transform(obj);
    }

    return this._latestValue;
  }

  private _subscribe(
    obj: Subscribable<any> | Promise<any> | EventEmitter<any>
  ): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(
      obj,
      (value: Object) => this._updateLatestValue(obj, value)
    );
  }

  private _selectStrategy(
    obj: Subscribable<any> | Promise<any> | EventEmitter<any>
  ): any {
    if (ɵisPromise(obj)) {
      return _promiseStrategy;
    }

    if (ɵisSubscribable(obj)) {
      return _subscribableStrategy;
    }

    return _valueStrategy;

    throw invalidPipeArgumentError(AsyncPlusPipe, obj);
  }

  private _dispose(): void {
    this._strategy.dispose(this._subscription!);
    this._latestValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object): void {
    if (async === this._obj) {
      this._latestValue = value;
      this._ref.markForCheck();
    }
  }
}
