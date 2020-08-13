import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

  /* istanbul ignore next */
  openDialog<T = any>(component, data = {}, options = { width: '60%' }) {
    return this.dialog.open<T>(component, {
      ...options,
      data,
    });
  }
}
