import { map } from 'rxjs/internal/operators/map';

export const countTotal = map((resp: any) => {
    return resp.total;
});
  