import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import {
  CasteAccountsService,
  CasteUserService,
  IApplication,
} from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

export interface CreateAccountData {
  application_id?: string;
  application?: IApplication;
}

@Component({
  selector: 'caste-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, LoadableComponent {
  public accountDetailsForm: FormGroup;
  public isLoading: boolean;
  public application: IApplication = null;
  public disableApplicationSelector = false;
  public userRole = 'sadmin';

  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateAccountData,
    private formBuilder: FormBuilder,
    private accounts$: CasteAccountsService,
    private snackbar: QSnackBar,
    public casteUser: CasteUserService
  ) {
    this.userRole = this.casteUser.isAdmin() ? 'admin' : 'sadmin';
  }

  ngOnInit() {
    if (this.data.application) {
      this.application = this.data.application;
      this.disableApplicationSelector = true;
    }

    this.accountDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  /* istanbul ignore next */
  addAccount() {
    if (this.accountDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.accounts$
      .create(
        {
          name: this.name.value,
          permissions: [],
          application: this.application['@id'],
        } as any,
        'admin'
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('CREATED_ACCOUNT_OK');
          this.close(CreateDialogStatus.CREATED);
        },
        (err) => {
          this.snackbar.open(err.message || err.detail);
          this.setIsLoading(false);
          this.dialogRef.disableClose = false;
        }
      );
  }

  get name() {
    return this.accountDetailsForm.get('name');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
