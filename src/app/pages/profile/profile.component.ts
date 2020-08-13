import { AuthedGuard } from 'src/app/guards/authed.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends PageBaseComponent {
  static guards: any[] = [AuthedGuard];
  public title = 'PROFILE';

  constructor(
    title: Title,
    translate$: TranslateService,
    public user$: UserService
  ) {
    super(title, translate$);

    console.log(user$.user);
  }
}
