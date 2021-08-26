import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  QEventsService,
  QSnackBar,
  QTableBase,
} from '@qbitartifacts/qbit-kit-ng';
import { AppService } from '../services/app.service';

@Component({
  selector: 'caste-users-list',
  template: '',
})
export abstract class TablePageBase<T> extends QTableBase<T> {
  isSuperadmin: boolean = false;

  constructor(
    public app: AppService,
    public snackbar: QSnackBar,
    public events: QEventsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(snackbar, events, router, route);
  }

  ngOnInit() {
    this.isAdmin = this.app.user$.isAdmin();
    this.isInvestor = this.app.user$.isInvestor();
    this.isTrader = this.app.user$.isTrader();
    this.isSuperadmin = this.app.user$.isSuperadmin();
    super.ngOnInit();
  }
}
