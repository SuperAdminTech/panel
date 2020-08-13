import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  path: string;

  constructor(private route: ActivatedRoute, public app$: AppService) {}

  ngOnDestroy() {
    this.app$.publicRoute = false;
  }

  ngOnInit() {
    this.app$.publicRoute = true;

    this.route.data.pipe(take(1)).subscribe((data: { path: string }) => {
      this.path = data.path;
    });
  }
}
