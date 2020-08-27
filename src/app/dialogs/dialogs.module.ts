import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { IdleNotificationComponent } from './idle-notification/idle.dia';
import { ComponentsModule } from '../components/components.module';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CreatePermissionComponent } from './create-permission/create-permission.component';

const dialogs = [
  IdleNotificationComponent,
  CreateApplicationComponent,
  DeleteConfirmationComponent,
  CreatePermissionComponent,
];

@NgModule({
  declarations: dialogs,
  exports: dialogs,
  entryComponents: dialogs,
  imports: [SharedModule, ComponentsModule],
})
export class DialogsModule {}
