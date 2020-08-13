import { TranslateService } from '@ngx-translate/core';
import { Component, AfterContentInit } from '@angular/core';
import { Permission } from './../entities/permission';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({ template: '' })
export abstract class PageBaseComponent implements AfterContentInit {
  static permissions: Permission[] = [];
  abstract title: string;
  public environment = environment;

  constructor(public title$: Title, public translate$: TranslateService) {}

  public ngAfterContentInit() {
    // This was needed here, as TranslateLoader takes some time to have the translations available
    // NOT the best alternative, could be changed if better solution is found
    setTimeout(this.updateTitle.bind(this));
  }

  public setTitle(title: string) {
    this.title = title;
    this.updateTitle();
  }

  public updateTitle() {
    this.title$.setTitle(
      this.translate$.instant(this.title) + ' | ' + this.environment.brand.title
    );
  }
}
