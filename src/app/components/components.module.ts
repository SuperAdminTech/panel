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
import { BotDetailsComponent } from './details/bot-details/bot-details.component';
import { UserDetailsComponent } from './details/user-details/user-details.component';
import { InstanceDetailsComponent } from './details/instance-details/instance-details.component';
import { KeyValueItem } from './kvp/kvp-item/kvp-item';
import { KeyValuePair } from './kvp/kvp-list/kvp-list';
import { StrategyListComponent } from './lists/strategies-list/strategies-list.component';
import { UsersListComponent } from './lists/users-list/users-list.component';
import { BotsListComponent } from './lists/bots-list/bots-list.component';
import { InstanceListComponent } from './lists/instance-list/instance-list.component';
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
  BotDetailsComponent,
  InstanceDetailsComponent,
  UserDetailsComponent,

  // Key value
  KeyValueItem,
  KeyValuePair,

  // Lists
  BotsListComponent,
  InstanceListComponent,
  StrategyListComponent,
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
