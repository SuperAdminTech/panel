import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstanceConfigComponent } from '../instance-config/instance-config.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadableComponent } from 'src/app/base/loadable.page';
import { InstancesService } from 'src/app/services/CRUD/logic-traders/instances.service';

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.component.html',
  styleUrls: ['./create-instance.component.scss'],
})
export class CreateInstanceComponent implements OnInit, LoadableComponent {
  public instanceDetailsForm: FormGroup;
  public isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<InstanceConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private instances: InstancesService
  ) {}

  addInstance() {
    if (this.instanceDetailsForm.invalid) {
      return false;
    }

    this.setIsLoading(true);
    this.dialogRef.disableClose = true;

    console.log('Data', this.instanceDetailsForm.value);
    this.instances
      .create({
        name: this.name.value,
        description: this.description.value,
      })
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);
        }
      );

    // this.setIsLoading(false);
    // this.dialogRef.disableClose = false;
  }

  ngOnInit() {
    this.instanceDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // strategy: ['', Validators.required],
    });
  }

  get name() {
    return this.instanceDetailsForm.get('name');
  }

  get description() {
    return this.instanceDetailsForm.get('description');
  }

  setIsLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  close() {
    this.dialogRef.close();
  }
}
