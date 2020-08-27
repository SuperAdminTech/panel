import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateApplicationComponent } from '../dialogs/create-application/create-application.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { CreatePermissionComponent } from '../dialogs/create-permission/create-permission.component';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

  /* istanbul ignore next */
  openDialog<T = any>(
    component,
    data = {},
    options: Partial<MatDialogConfig> = { width: '60%' }
  ) {
    return this.dialog.open<T>(component, {
      ...options,
      data,
    });
  }

  openAddApplication(options?: Partial<MatDialogConfig>) {
    return this.openDialog(
      CreateApplicationComponent,
      {},
      { ...options, width: '300px' }
    );
  }

  openConfirmDelete(options?: Partial<MatDialogConfig>) {
    return this.openDialog(
      DeleteConfirmationComponent,
      {},
      { ...options, width: '400px' }
    );
  }

  openAddPermission(options?: Partial<MatDialogConfig>) {
    return this.openDialog(
      CreatePermissionComponent,
      {},
      { ...options, width: '300px' }
    );
  }
}
