import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { IdleNotificationComponent } from './idle-notification/idle.dia';
import { ComponentsModule } from '../components/components.module';

const dialogs = [IdleNotificationComponent];

@NgModule({
  declarations: dialogs,
  exports: dialogs,
  entryComponents: dialogs,
  imports: [SharedModule, ComponentsModule],
})
export class DialogsModule {}
