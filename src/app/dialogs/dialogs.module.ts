import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { InstanceConfigComponent } from './instance-config/instance-config.component';
import { IdleNotificationComponent } from './idle-notification/idle.dia';
import { ComponentsModule } from '../components/components.module';
import { CreateInstanceComponent } from './create-instance/create-instance.component';

const dialogs = [
  IdleNotificationComponent,
  InstanceConfigComponent,
  CreateInstanceComponent,
];

@NgModule({
  declarations: dialogs,
  exports: dialogs,
  entryComponents: dialogs,
  imports: [SharedModule, ComponentsModule],
})
export class DialogsModule {}
