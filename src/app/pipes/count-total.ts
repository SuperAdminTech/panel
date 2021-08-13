import { map } from 'rxjs/internal/operators/map';

/* istanbul ignore next */
export const countTotal = map((resp: any) => {
    return resp.total;
});
  