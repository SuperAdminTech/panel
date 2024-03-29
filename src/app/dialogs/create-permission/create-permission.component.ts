import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { Account, CastePermissionsService, User } from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';
import { AppService } from 'src/app/services/app.service';
import { UserType } from '@qbitartifacts/caste-client-ng/lib/types';

export interface CreatePermissionData {
  user: User;
  account: Account;
  account_id?: string;
  user_id?: string;
  availableGrants?: string[];
}

@Component({
  selector: 'caste-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit, LoadableComponent {
  public permissionDetailsForm: FormGroup;
  public isLoading: boolean;
  public defaultGrants = ['ACCOUNT_WORKER'];
  public account = null;
  public user = null;
  public grants = ['ACCOUNT_WORKER'];
  public userType: UserType = 'admin';
  public userSelectorFilters = {};

  constructor(
    public dialogRef: MatDialogRef<CreatePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreatePermissionData,
    private formBuilder: FormBuilder,
    private permissions$: CastePermissionsService,
    private snackbar: QSnackBar,
    public app: AppService
  ) {
    this.userType = this.app.getUserType();
  }

  get availableGrants() {
    return (
      this.data.availableGrants ||
      (this.account ? this.account.application.grants : this.defaultGrants) ||
      this.defaultGrants
    );
  }

  ngOnInit() {
    this.permissionDetailsForm = this.formBuilder.group({});
    this.user = this.data.user;
    this.account = this.data.account;
  }

  /* istanbul ignore next */
  addPermission() {
    if (this.permissionDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.permissions$
      .create(
        {
          account: `/user/accounts/${this.data.account_id || this.account.id}`,
          user: `/user/users/${this.user.id}`,
          grants: this.grants,
        } as any,
        this.userType
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('CREATED_PERMISSION_OK');
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
