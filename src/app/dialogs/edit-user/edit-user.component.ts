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
import { KvpItem } from 'src/app/components/kvp/kvp-list/kvp-list';

@Component({
  selector: 'caste-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, LoadableComponent {
  public userForm: FormGroup;
  public isLoading: boolean;
  public user: User & { data: any };
  public application: Application;
  public roles: string[] = [RoleUser.name];
  public userData: KvpItem[] = [
    {
      key: '',
      value: '',
      active: true,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User & { data: any } },
    private formBuilder: FormBuilder,
    private users$: CasteUsersService,
    private snackbar: QSnackBar
  ) {
    this.user = data.user;
    this.application = this.user.application;
    this.roles = this.user.roles.map((role) => role.name);
    this.userData = [];

    if(this.user.data) {
      for(let key in this.user.data){
        this.userData.push({
          key: key,
          value: this.user.data[key],
          active: true,
        });
      }
    }
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
          data: this.getFieldMap(),
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

  public getFieldMap() {
    const map = {};
    for (const entry of this.userData) {
      if (entry && entry.active && entry.key) {
        map[entry.key] = entry.value;
      }
    }
    return map;
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  reset() {
    this.userData = [];
  }

  changedItems($event) {
    console.log($event);
  }

  close(status: CreateDialogStatus = CreateDialogStatus.CANCELED) {
    this.dialogRef.close(status);
  }
}
