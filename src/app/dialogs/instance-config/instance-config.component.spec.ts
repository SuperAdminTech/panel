import { MatDialogRef } from '@angular/material/dialog';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceConfigComponent } from './instance-config.component';
import { AppModule } from 'src/app/app.module';
import { MockMatRef } from '../idle-notification/idle.dia.spec';

describe('InstanceConfigComponent', () => {
  let component: InstanceConfigComponent;
  let fixture: ComponentFixture<InstanceConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: MatDialogRef, useValue: MockMatRef }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
