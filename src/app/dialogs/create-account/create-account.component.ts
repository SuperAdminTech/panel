import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { CasteAccountsService } from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, LoadableComponent {
  public accountDetailsForm: FormGroup;
  public isLoading: boolean;
  public application = null;

  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private accounts$: CasteAccountsService,
    private snackbar: QSnackBar
  ) {}

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

  ngOnInit() {
    this.accountDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
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
