import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { Account, Application, CasteUsersService, RoleUser } from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

// "username": "string",
//   "account": "string",
//   "application": "string",
//   "permissions": [
//     "string"
//   ],
//   "roles": [
//     "string"
//   ]

@Component({
  selector: 'caste-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, LoadableComponent {
  public userForm: FormGroup;
  public isLoading: boolean;
  public application: Application;
  public account: Account;
  public roles: String[] = [RoleUser.name];

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private users$: CasteUsersService,
    private snackbar: QSnackBar
  ) {}

  /* istanbul ignore next */
  add() {
    if (this.userForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.users$.create({} as any, 'admin').subscribe(
      (resp) => {
        this.snackbar.open('CREATED_USER_OK');
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
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
