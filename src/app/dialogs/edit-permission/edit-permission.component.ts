import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import {
  CastePermissionsService,
  IPermission,
} from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';
import { AppService } from 'src/app/services/app.service';
import { UserType } from '@qbitartifacts/caste-client-ng/lib/types';

export interface EditPermissionData {
  permission: IPermission;
  account_id?: string;
  availableGrants?: string[];
}

@Component({
  selector: 'caste-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss'],
})
export class EditPermissionComponent implements OnInit, LoadableComponent {
  public permissionDetailsForm: FormGroup;
  public isLoading: boolean;
  public defaultGrants = ['ACCOUNT_WORKER'];
  public account = null;
  public user = null;
  public grants = ['ACCOUNT_WORKER'];
  public userType: UserType = 'user';

  constructor(
    public dialogRef: MatDialogRef<EditPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditPermissionData,
    private formBuilder: FormBuilder,
    private permissions$: CastePermissionsService,
    private snackbar: QSnackBar,
    public app: AppService
  ) {
    this.userType = this.app.getUserType();
  }

  ngOnInit() {
    this.permissionDetailsForm = this.formBuilder.group({});
    this.account = this.data.permission.account;
    this.user = this.data.permission.user;
    this.grants = this.data.permission.grants;
    console.log(this);
  }

  get availableGrants() {
    return this.account && this.account.application.grants
      ? this.account.application.grants
      : this.defaultGrants;
  }

  /* istanbul ignore next */
  addPermission() {
    if (this.permissionDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.permissions$
      .update(
        this.data.permission.id,
        {
          account: `/user/accounts/${this.account.id}`,
          user: `/user/users/${this.user.id}`,
          grants: this.grants,
        } as any,
        this.userType
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('UPDATED_PERMISSION_OK');
          this.dialogRef.disableClose = false;
          this.close(CreateDialogStatus.CREATED);
        },
        (err) => {
          this.snackbar.open(err.message || err.detail);
          this.setIsLoading(false);
          this.dialogRef.disableClose = false;
        }
      );
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
