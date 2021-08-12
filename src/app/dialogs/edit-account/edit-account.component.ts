import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import {
  Account,
  Application,
  CasteAccountsService,
} from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

export interface EditAccountData {
  account: Account;
}

@Component({
  selector: 'caste-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit, LoadableComponent {
  public account: Account;
  public accountDetailsForm: FormGroup;
  public isLoading: boolean;
  public application: Application;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditAccountData,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    private formBuilder: FormBuilder,
    private accounts$: CasteAccountsService,
    private snackbar: QSnackBar
  ) {
    this.account = data.account;
    this.application = data.account.application;
  }

  get hasEdit(): boolean {
    const nameChanged = this.name.value != this.account.name;
    const enabledChanged = this.enabled.value != this.account.enabled;
    const applicationChanged = this.application.id != this.account.application.id;
    
    return nameChanged || applicationChanged || enabledChanged;
  }

  /* istanbul ignore next */
  addAccount() {
    if (this.accountDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.accounts$
      .update(
        this.account.id,
        {
          name: this.name.value,
          enabled: this.enabled.value,
          permissions: [],
          application: this.application['@id'],
        } as any,
        'user'
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('EDITED_ACCOUNT_OK');
          this.close(CreateDialogStatus.CREATED);
        },
        (err) => {
          this.snackbar.open(err.message || err.detail);
          this.setIsLoading(false);
          this.dialogRef.disableClose = false;
        }
      );
  }

  ngOnInit() {
    this.accountDetailsForm = this.formBuilder.group({
      name: [this.account.name, Validators.required],
      enabled: [this.account.enabled],
    });
  }

  get name() {
    return this.accountDetailsForm.get('name');
  }

  get enabled() {
    return this.accountDetailsForm.get('enabled');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
