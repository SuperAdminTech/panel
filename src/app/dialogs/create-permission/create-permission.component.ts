import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { CastePermissionsService } from '@qbitartifacts/caste-client-ng';
import { MySnackBarService } from 'src/app/services/mysnackbar.service';
import { CreateDialogStatus } from 'src/app/enums/create-dialog-status';

@Component({
  selector: 'caste-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit, LoadableComponent {
  public permissionDetailsForm: FormGroup;
  public isLoading: boolean;
  public availableGrants = ['ACCOUNT_WORKER', 'ACCOUNT_MANAGER'];
  public account = null;

  constructor(
    public dialogRef: MatDialogRef<CreatePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private permissions$: CastePermissionsService,
    private snackbar: MySnackBarService
  ) {}

  /* istanbul ignore next */
  addPermission() {
    if (this.permissionDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    console.log('Data', this.permissionDetailsForm.value);
    this.permissions$
      .givePermissionByUsername({
        account: `/user/accounts/${this.account.id}`,
        username: this.username.value,
        grants: this.grants.value,
      })
      .subscribe(
        (resp) => {
          this.snackbar.open('CREATED_APP_OK');
          this.close(CreateDialogStatus.CREATED);
        },
        (err) => {
          this.snackbar.open(err.message || err.detail);
          this.setIsLoading(false);
        }
      );
  }

  ngOnInit() {
    this.permissionDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      grants: ['', Validators.required],
    });
  }

  get username() {
    return this.permissionDetailsForm.get('username');
  }

  get grants() {
    return this.permissionDetailsForm.get('grants');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
