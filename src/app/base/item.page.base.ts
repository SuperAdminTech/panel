import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PageBaseComponent } from './page.base';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({ template: '' })
export abstract class ItemPageBaseComponent extends PageBaseComponent {
  public itemId = null;

  constructor(
    public title$: Title,
    public translate$: TranslateService,
    public route: ActivatedRoute
  ) {
    super(title$, translate$, route);
    this.route.params.subscribe((params) => {
      this.itemId = params.id;
    });
  }
}
