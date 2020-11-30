import { map } from 'rxjs/internal/operators/map';

export const countTotal = map((resp: any) => {
    console.log('total', resp);
    return resp.total;
});
  