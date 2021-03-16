import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap, takeUntil } from 'rxjs/operators';
import { REFRESH_TABLE_INTERVAL_MS } from '../consts';

/* istanbul ignore next */
export function createTimer(
  getObserver: () => Observable<any>,
  stopPolling: Subject<any>,
  interval: number = REFRESH_TABLE_INTERVAL_MS
) {
  return timer(1, interval).pipe(
    switchMap(() => {
      return getObserver();
    }),
    takeUntil(stopPolling)
  );
}
