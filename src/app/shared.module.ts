import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PermissionsDirective } from './directives/permissions.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PermissionsDirective],
  imports: [
    MaterialModule,
    BrowserModule,
    TranslateModule.forChild(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    BrowserModule,
    TranslateModule,
    RouterModule,
    PermissionsDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
