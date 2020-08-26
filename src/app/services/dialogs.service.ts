import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateApplicationComponent } from '../dialogs/create-application/create-application.component';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

  /* istanbul ignore next */
  openDialog<T = any>(component, data = {}, options: any = { width: '60%' }) {
    return this.dialog.open<T>(component, {
      ...options,
      data,
    });
  }

  openAddApplication(options?: any) {
    return this.openDialog(
      CreateApplicationComponent,
      {},
      { ...options, width: '300px' }
    );
  }
}
