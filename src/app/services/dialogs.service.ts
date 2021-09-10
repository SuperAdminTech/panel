import { CreateUserComponent } from './../dialogs/create-user/create-user.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateApplicationComponent } from '../dialogs/create-application/create-application.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import {
  CreatePermissionComponent,
  CreatePermissionData,
} from '../dialogs/create-permission/create-permission.component';
import {
  CreateAccountComponent,
  CreateAccountData,
} from '../dialogs/create-account/create-account.component';
import {
  EditAccountComponent,
  EditAccountData,
} from '../dialogs/edit-account/edit-account.component';
import {
  IApplication,
  IPermission,
  User,
} from '@qbitartifacts/caste-client-ng';
import { EditUserComponent } from '../dialogs/edit-user/edit-user.component';
import { EditApplicationComponent } from '../dialogs/edit-application/edit-application.component';
import {
  EditPermissionComponent,
  EditPermissionData,
} from '../dialogs/edit-permission/edit-permission.component';

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
      { ...options, width: '45%' }
    );
  }

  openAddPermission(
    data?: CreatePermissionData,
    options?: Partial<MatDialogConfig>
  ) {
    return this.openDialog(CreatePermissionComponent, data, {
      ...options,
      width: '45%',
    });
  }

  openEditPermission(
    permission: EditPermissionData,
    options?: Partial<MatDialogConfig>
  ) {
    return this.openDialog(EditPermissionComponent, permission, {
      ...options,
      width: '45%',
    });
  }

  openAddAccount(
    data: CreateAccountData = {},
    options?: Partial<MatDialogConfig>
  ) {
    return this.openDialog(CreateAccountComponent, data, {
      ...options,
      width: '45%',
    });
  }

  openAddUser(options?: Partial<MatDialogConfig>) {
    return this.openDialog(CreateUserComponent, {}, options);
  }

  openEditAccount(data: EditAccountData, options?: Partial<MatDialogConfig>) {
    return this.openDialog(EditAccountComponent, data, {
      ...options,
      width: '45%',
    });
  }

  openEditUser(user: User, options?: Partial<MatDialogConfig>) {
    return this.openDialog(
      EditUserComponent,
      { user: Object.assign({}, user) },
      {
        ...options,
        width: '45%',
      }
    );
  }

  openEditApplication(
    application: IApplication,
    options?: Partial<MatDialogConfig>
  ) {
    return this.openDialog(
      EditApplicationComponent,
      Object.assign({}, application),
      {
        ...options,
        width: '45%',
      }
    );
  }
}
