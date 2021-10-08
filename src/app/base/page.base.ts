import { TranslateService } from '@ngx-translate/core';
import { Component, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { InternalPermission } from '@qbitartifacts/caste-client-ng';
import { ActivatedRoute } from '@angular/router';

@Component({ template: '' })
export abstract class PageBaseComponent implements AfterContentInit {
  static permissions: InternalPermission[] = [];
  abstract title: string;
  public environment = environment;
  public appName = environment.brand.title;

  constructor(
    public title$: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute
  ) {}

  public ngAfterContentInit() {
    // This was needed here, as TranslateLoader takes some time to have the translations available
    // NOT the best alternative, could be changed if better solution is found
    setTimeout(this.updateTitle.bind(this), 200);
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
