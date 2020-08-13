import { LoadableComponent } from 'src/app/base/loadable.page';
import { IInstance } from '../../../entities/instance';
import { Component, OnInit } from '@angular/core';
import { createInstance } from 'src/app/testing/generators.mock';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import { InstancesService } from 'src/app/services/CRUD/logic-traders/instances.service';
import { Observable } from 'rxjs/internal/Observable';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss'],
})
export class InstanceListComponent extends TableBase<IInstance>
  implements LoadableComponent {
  displayedColumns: string[] = [
    'alias',
    'balance',
    'exchange',
    'updated',
    'status',
  ];
  query: string;
  isLoading = false;

  constructor(
    public hotkeys: HotkeysService,
    public instances: InstancesService,
    public dialogs: DialogsService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.instances.listAll().subscribe(
      (resp) => {
        console.log('instances', resp);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  addInstance() {
    this.dialogs.openCreateInstance();
  }
}
