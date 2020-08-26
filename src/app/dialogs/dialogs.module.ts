import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { IdleNotificationComponent } from './idle-notification/idle.dia';
import { ComponentsModule } from '../components/components.module';
import { CreateApplicationComponent } from './create-application/create-application.component';

const dialogs = [IdleNotificationComponent, CreateApplicationComponent];

@NgModule({
  declarations: dialogs,
  exports: dialogs,
  entryComponents: dialogs,
  imports: [SharedModule, ComponentsModule],
})
export class DialogsModule {}
