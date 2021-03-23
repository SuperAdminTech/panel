import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogStatus } from '@qbitartifacts/qbit-kit-ng';

@Component({
  selector: 'caste-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(status: DeleteDialogStatus = DeleteDialogStatus.CANCEL) {
    this.dialogRef.close(status);
  }

  proceed() {
    this.close(DeleteDialogStatus.DELETE);
  }
}
