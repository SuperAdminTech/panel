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
import { ApplicationsListComponent } from './lists/applications-list/applications-list.component';
import { PermissionsListComponent } from './lists/permissions-list/permissions-list.component';
import { AccountsListComponent } from './lists/accounts-list/accounts-list.component';
import { AccountDetailsComponent } from './details/account-details/account-details.component';
import { ApplicationDetailsComponent } from './details/application-details/application-details.component';
import { PermissionsDetailsComponent } from './details/permission-details/permission-details.component';
import { ListLoadingComponent } from './list-loading/list-loading.component';
import { AccountSelectorComponent } from './selectors/account-selector/account-selector.component';
import { UserSelectorComponent } from './selectors/user-selector/user-selector.component';

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
  ListLoadingComponent,

  // Details Components
  UserDetailsComponent,
  AccountDetailsComponent,
  ApplicationDetailsComponent,
  PermissionsDetailsComponent,

  // Key value
  KeyValueItem,
  KeyValuePair,

  // Lists
  UsersListComponent,
  ApplicationsListComponent,
  PermissionsListComponent,
  AccountsListComponent,

  // Selectors
  AccountSelectorComponent,
  UserSelectorComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [SharedModule],
})
export class ComponentsModule {}
