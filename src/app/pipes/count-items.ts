import { map } from 'rxjs/internal/operators/map';

/* istanbul ignore next */
export const countItems = map((data: any) => {
    return data.total || data.length;
});
