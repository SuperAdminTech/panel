import { PublicGuard } from './guards/public.guard';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom imports
import { AuthedGuard } from './guards/authed.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationsModule } from './translations.module';

// Register locales so angular knows how to format dates and stuff
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './md-i18n';
import { SessionCheckerService } from './services/session-checker.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableBase } from './base/table.page';
import { PageBaseComponent } from './base/page.base';
import { ItemPageBaseComponent } from './base/item.page.base';
import { DialogsService } from './services/dialogs.service';

import { HotkeysModule } from '@qbitartifacts/qbit-hotkeys';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';
import { DebugScreenModule } from '@qbitartifacts/qbit-debug-screen';
import { QbitAuthModule, QBIT_AUTH_CONFIG } from '@qbitartifacts/qbit-auth';
import { StrategiesService } from './services/CRUD/logic-traders/strategies.service';
import { InstancesService } from './services/CRUD/logic-traders/instances.service';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared.module';
import { PagesModule } from './pages/pages.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { environment } from 'src/environments/environment';

registerLocaleData(localeEn);
registerLocaleData(localeEs);

const modules = [
  AppRoutingModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HotkeysModule,
  SharedModule,
  HttpClientModule,
  DebugScreenModule,
  QbitAuthModule,
  ComponentsModule,
  PagesModule,
  TranslationsModule,
  DialogsModule,
];

const qbitAuthConfigProvider = {
  provide: QBIT_AUTH_CONFIG,
  useValue: {
    realm: 'default',
    url: environment.url,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    PageBaseComponent as any,
    ItemPageBaseComponent as any,
    TableBase as any,
  ],
  imports: modules,
  providers: [
    PublicGuard,
    AuthedGuard,
    QEventsService,
    SessionCheckerService,
    DialogsService,
    StrategiesService,
    InstancesService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
    qbitAuthConfigProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
