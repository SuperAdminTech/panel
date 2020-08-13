import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstanceConfigComponent } from '../dialogs/instance-config/instance-config.component';
import { CreateInstanceComponent } from '../dialogs/create-instance/create-instance.component';

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

  /* istanbul ignore next */
  openEditInstance(id: string) {
    return this.openDialog<InstanceConfigComponent>(InstanceConfigComponent, {
      id,
    });
  }

  openCreateInstance() {
    return this.openDialog<CreateInstanceComponent>(
      CreateInstanceComponent,
      {},
      { width: '40%' }
    );
  }
}
