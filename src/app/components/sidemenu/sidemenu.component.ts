import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SIDEMENU_ITEMS, SidemenuItem } from '../../../config/sidemenu.items';
import { QEventsService } from 'src/app/services/events.service';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { SHORTCUTS } from 'src/config/shortcuts';
import { AppService } from 'src/app/services/app.service';
import { PermissionUser } from 'src/app/permissions';

@Component({
  selector: 'caste-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  static EVT_TOGGLE_SIDEMENU = 'toggle:sidemenu';
  public toggleEvent: EventEmitter<boolean>;

  public items: SidemenuItem[] = SIDEMENU_ITEMS;

  // this could be saved in LocalStorage
  public opened = true;

  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  constructor(
    public events: QEventsService,
    public hotkeys: HotkeysService,
    public app$: AppService
  ) {
    this.recoverStateFromStorage();
    this.toggleEvent = events.on<boolean>(
      SidemenuComponent.EVT_TOGGLE_SIDEMENU
    );
  }

  /* istanbul ignore next */
  saveStateToStorage() {
    localStorage.setItem(
      SidemenuComponent.EVT_TOGGLE_SIDEMENU,
      String(this.drawer.opened)
    );
  }

  /* istanbul ignore next */
  recoverStateFromStorage() {
    const saved = localStorage.getItem(SidemenuComponent.EVT_TOGGLE_SIDEMENU);
    if (saved !== null) {
      this.opened = saved === 'true';
    }
  }

  ngOnDestroy() {
    this.toggleEvent.unsubscribe();
    this.events.off(SidemenuComponent.EVT_TOGGLE_SIDEMENU);
  }

  /* istanbul ignore next */
  ngOnInit() {
    this.toggleEvent.subscribe(() => {
      this.drawer.toggle();
      this.saveStateToStorage();
    });

    this.app$.getApiVersion().subscribe({
      next: this.addApiVersionItem.bind(this),
    });
  }

  private addApiVersionItem(resp) {
    const apiVersionAlreadyAdded = this.items.find((el) => el.label === 'API');
    if (!apiVersionAlreadyAdded) {
      this.items.push({
        keyValue: true,
        label: 'API',
        value: resp.code,
        permission: PermissionUser,
      });
    }
  }

  /* istanbul ignore next */
  openShortcutHelp() {
    this.hotkeys.dispatchShortcut(SHORTCUTS.hotkeysHelp);
  }
}
