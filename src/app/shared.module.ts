import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  QbitKitBaseModule,
  QBreadcrumbsModule,
  QSnackBarModule,
  QTableHeaderModule,
  SaComponentsModule,
} from '@qbitartifacts/qbit-kit-ng';

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    TranslateModule.forChild(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // QbitKitNg modules
    QBreadcrumbsModule,
    QSnackBarModule,
    QbitKitBaseModule,
    QTableHeaderModule,
    SaComponentsModule,
  ],
  exports: [
    MaterialModule,
    BrowserModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QBreadcrumbsModule,
    QSnackBarModule,
    QbitKitBaseModule,
    QTableHeaderModule,
    SaComponentsModule,
  ],
})
export class SharedModule {}
