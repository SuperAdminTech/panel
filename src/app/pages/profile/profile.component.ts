import { AuthedGuard } from 'src/app/guards/authed.guard';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { CasteUsersService } from '@qbitartifacts/caste-client-ng';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'caste-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends PageBaseComponent implements OnInit {
  static guards: any[] = [AuthedGuard];
  public title = 'PROFILE';

  constructor(
    title: Title,
    translate$: TranslateService,
    route: ActivatedRoute,
    private user$: UserService,
    private users$: CasteUsersService
  ) {
    super(title, translate$, route);
  }

  /* istanbul ignore next */
  ngOnInit() {
    if (this.user$.hasUser()) {
      this.users$.getOne(this.user$.user.id).subscribe(
        (resp) => {},
        (error) => {}
      );
    }
  }
}
