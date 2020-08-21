import { Component, OnInit } from '@angular/core';
import { TableBase } from 'src/app/base/table.page';
import { HotkeysService } from '@qbitartifacts/qbit-hotkeys';
import {
  CastePermissionsService,
  PermissionResponse,
} from '@qbitartifacts/caste-client-ng';

@Component({
  selector: 'caste-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends TableBase<PermissionResponse>
  implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'user',
    'account',
    'grants',
    'updated_at',
  ];

  constructor(
    public hotkeys: HotkeysService,
    private permissions: CastePermissionsService
  ) {
    super(hotkeys);
  }

  public onSearch() {
    this.permissions.listAll().subscribe((resp) => {
      console.log(resp);
      this.setData(resp);
    });
  }

  ngOnInit() {}
}
