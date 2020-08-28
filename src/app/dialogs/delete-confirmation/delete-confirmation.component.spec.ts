import { MockMatRef } from '../idle-notification/idle.dia.spec';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogStatus } from 'src/app/enums/delete-dialog-status';

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: MatDialogRef, useValue: MockMatRef }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close', () => {
    spyOn(component.dialogRef, 'close');
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalledWith(
      DeleteDialogStatus.CANCEL
    );
  });

  it('proceed', () => {
    spyOn(component.dialogRef, 'close');
    component.proceed();
    expect(component.dialogRef.close).toHaveBeenCalledWith(
      DeleteDialogStatus.DELETE
    );
  });
});