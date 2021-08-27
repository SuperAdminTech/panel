import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import {
  CasteApplicationService,
  IApplication,
} from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'caste-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss'],
})
export class EditApplicationComponent implements OnInit, LoadableComponent {
  public applicationDetailsForm: FormGroup;
  public isLoading: boolean;
  public grants = [];
  public defaultGrants = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(
    public dialogRef: MatDialogRef<EditApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IApplication,
    private formBuilder: FormBuilder,
    private applications$: CasteApplicationService,
    private snackbar: QSnackBar
  ) {}


  ngOnInit() {
    this.defaultGrants = [...this.data.default_grants];
    this.grants = [...this.data.grants];

    this.applicationDetailsForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      realm: [this.data.realm, Validators.required],
      grants: [this.data.grants],
    });
  }

  /* istanbul ignore next */
  editApplication() {
    if (this.applicationDetailsForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.applications$
      .update(
        this.data.id,
        {
          name: this.name.value,
          realm: this.realm.value,
          grants: this.grants,
          default_grants: this.defaultGrants,
        } as any,
        'admin'
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('UPDATED_APP_OK');
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
    return this.applicationDetailsForm.get('name');
  }

  get realm() {
    return this.applicationDetailsForm.get('realm');
  }

  addGrantFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.grants.push(event.value);
      event.input!.value = '';
    }
  }

  removeGrant(grant: string) {
    this.grants.splice(this.grants.indexOf(grant), 1);
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
