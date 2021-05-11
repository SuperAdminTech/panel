import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  QbitKitBaseModule,
  QBreadcrumbsModule,
  QDialogHeaderModule,
  QLoadableButtonModule,
  QSnackBarModule,
  QTableFiltersModule,
  QTableHeaderModule,
  SaComponentsModule,
} from '@qbitartifacts/qbit-kit-ng';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    TranslateModule.forChild(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,

    // QbitKitNg modules
    QBreadcrumbsModule,
    QSnackBarModule,
    QbitKitBaseModule,
    QTableHeaderModule,
    QDialogHeaderModule,
    QLoadableButtonModule,
    QTableFiltersModule,
    SaComponentsModule,
  ],
  exports: [
    MaterialModule,
    BrowserModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,

    QBreadcrumbsModule,
    QSnackBarModule,
    QbitKitBaseModule,
    QDialogHeaderModule,
    QTableHeaderModule,
    QLoadableButtonModule,
    QTableFiltersModule,
    SaComponentsModule,
  ],
})
export class SharedModule {}
