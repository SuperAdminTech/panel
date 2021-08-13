import { MockMatRef } from '../idle-notification/idle.dia.spec';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: MockMatRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            user: {
              roles: [],
            },
          },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is loading', () => {
    component.setIsLoading(true);
    expect(component.isLoading).toEqual(true);
  });

  it('close', () => {
    spyOn(component.dialogRef, 'close');
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
