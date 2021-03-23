import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { CasteApplicationService } from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus } from 'src/app/enums/create-dialog-status';
import { QSnackBar } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent implements OnInit, LoadableComponent {
  public applicationDetailsForm: FormGroup;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private applications$: CasteApplicationService,
    private snackbar: QSnackBar
  ) {}

  /* istanbul ignore next */
  addApplication() {
    if (this.applicationDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    console.log('Data', this.applicationDetailsForm.value);
    this.applications$
      .create(
        {
          name: this.name.value,
          realm: this.realm.value,
        } as any,
        'sadmin'
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('CREATED_APP_OK');
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
    this.applicationDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      realm: ['', Validators.required],
    });
  }

  get name() {
    return this.applicationDetailsForm.get('name');
  }

  get realm() {
    return this.applicationDetailsForm.get('realm');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
