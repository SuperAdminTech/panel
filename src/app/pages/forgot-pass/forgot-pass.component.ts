import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Title } from '@angular/platform-browser';
import { PublicGuard } from 'src/app/guards/public.guard';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'caste-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent extends PageBaseComponent
  implements AfterContentInit {
  static guards: any[] = [PublicGuard];
  public title = 'Forgot Password';

  constructor(title: Title, public translate$: TranslateService) {
    super(title, translate$);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
}
