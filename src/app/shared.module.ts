import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  QAddButtonModule,
  QbitKitBaseModule,
  QBreadcrumbsModule,
  QChipsModule,
  QDebouncedInputModule,
  QDialogHeaderModule,
  QLangSelectorModule,
  QListLoadingModule,
  QLoadableButtonModule,
  QNotFoundModule,
  QSnackBarModule,
  QTableFiltersModule,
  QTableHeaderModule,
  SaComponentsModule,
} from '@qbitartifacts/qbit-kit-ng';
import { AvatarModule } from 'ngx-avatar';
import { AsyncPlusPipe } from './pipes/async-plus';

@NgModule({
  declarations: [AsyncPlusPipe],
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
    SaComponentsModule,
    QAddButtonModule,
    QNotFoundModule,

    QLangSelectorModule,
    QLoadableButtonModule,
    QListLoadingModule,
    QDialogHeaderModule,
    QDebouncedInputModule,
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
    QChipsModule,
    SaComponentsModule,
    AsyncPlusPipe,
  ],
})
export class SharedModule {}
