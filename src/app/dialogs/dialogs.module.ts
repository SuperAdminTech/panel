import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { IdleNotificationComponent } from './idle-notification/idle.dia';
import { ComponentsModule } from '../components/components.module';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

const dialogs = [
  IdleNotificationComponent,
  DeleteConfirmationComponent,
  CreateApplicationComponent,
  CreatePermissionComponent,
  CreateAccountComponent,
  CreateUserComponent,
  EditAccountComponent,
  EditUserComponent,
  EditApplicationComponent,
  EditPermissionComponent,
];

@NgModule({
  declarations: dialogs,
  exports: dialogs,
  entryComponents: dialogs,
  imports: [SharedModule, ComponentsModule],
})
export class DialogsModule {}
