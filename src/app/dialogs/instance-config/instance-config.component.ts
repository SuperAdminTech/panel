import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-instance-config',
  templateUrl: './instance-config.component.html',
  styleUrls: ['./instance-config.component.scss'],
})
export class InstanceConfigComponent implements OnInit, AfterViewInit {
  public instanceConfig = [
    { key: 'id', value: '$.id', active: true },
    { key: 'company_name', value: '$.name', active: true },
  ];

  public instanceDetailsForm: FormGroup;
  public hideKey = true;
  public hideSecret = true;

  constructor(
    public dialogRef: MatDialogRef<InstanceConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private formBuilder: FormBuilder
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.instanceDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      api_key: ['', Validators.required],
      api_secret: ['', Validators.required],
    });
  }

  get name() {
    return this.instanceDetailsForm.get('name');
  }

  get description() {
    return this.instanceDetailsForm.get('description');
  }

  get api_key() {
    return this.instanceDetailsForm.get('api_key');
  }

  get api_secret() {
    return this.instanceDetailsForm.get('api_secret');
  }

  close() {
    this.dialogRef.close();
  }
}
