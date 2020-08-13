import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionCheckerService } from 'src/app/services/session-checker.service';

@Component({
  selector: 'idle',
  templateUrl: './idle.html',
})
export class IdleNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<IdleNotificationComponent>,
    public utils: SessionCheckerService,
  ) {}

  public resetCounter() {
    localStorage.setItem('session_status', 'active');
    this.close(true);
  }

  public close(e?): void {
    localStorage.setItem('session_status', 'active');
    this.dialogRef.close(e);
  }
}
