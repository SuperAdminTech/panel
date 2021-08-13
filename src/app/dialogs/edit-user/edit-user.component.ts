import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import {
  Application,
  CasteUsersService,
  RoleUser,
  User,
} from '@qbitartifacts/caste-client-ng';
import { CreateDialogStatus, QSnackBar } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, LoadableComponent {
  public userForm: FormGroup;
  public isLoading: boolean;
  public user: User;
  public application: Application;
  public roles: string[] = [RoleUser.name];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder,
    private users$: CasteUsersService,
    private snackbar: QSnackBar
  ) {
    this.user = data.user;
    this.application = this.user.application;
    this.roles = this.user.roles.map((role) => role.name);
  }

  /* istanbul ignore next */
  add() {
    if (this.userForm.invalid || this.isLoading) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    this.users$
      .update(
        this.user.id,
        {
          username: this.username.value,
          application: this.application['@id'],
          roles: this.roles,
        } as any,
        'user'
      )
      .subscribe(
        (resp) => {
          this.snackbar.open('EDITED_USER_OK');
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
      username: [this.user.username, Validators.required],
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
