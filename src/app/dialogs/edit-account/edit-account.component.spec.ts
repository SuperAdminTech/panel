import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockMatRef } from '../idle-notification/idle.dia.spec';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountComponent } from './edit-account.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreateAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [{ provide: MatDialogRef, useValue: MockMatRef }],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountComponent);
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
