import { NgModule } from '@angular/core';
import { AddButtonComponent } from './add-button/add-button.component';
import { AggregateComponent } from './aggregate/aggregate.component';
import { LangSelectorComponent } from './lang-selector/lang.selector';
import { LoadableButtonComponent } from './loadable-button/loadable-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { PlayStopComponent } from './play-stop/play-stop.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserAvatarMenuComponent } from './user-avatar-menu/user-avatar-menu.component';
import { UserDetailsComponent } from './details/user-details/user-details.component';
import { KeyValueItem } from './kvp/kvp-item/kvp-item';
import { KeyValuePair } from './kvp/kvp-list/kvp-list';
import { UsersListComponent } from './lists/users-list/users-list.component';
import { DashChart } from './dash-chart/dash-chart.component';
import { SharedModule } from '../shared.module';

const components = [
  AddButtonComponent,
  AggregateComponent,
  LangSelectorComponent,
  LoadableButtonComponent,
  ModalHeaderComponent,
  NotFoundComponent,
  PlayStopComponent,
  SidemenuComponent,
  TableHeaderComponent,
  ToolbarComponent,
  UserAvatarMenuComponent,
  DashChart,

  // Details Components
  UserDetailsComponent,

  // Key value
  KeyValueItem,
  KeyValuePair,

  // Lists
  UsersListComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    SharedModule
  ],
})
export class ComponentsModule {}
