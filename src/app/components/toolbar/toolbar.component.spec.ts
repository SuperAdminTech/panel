import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserAvatarMenuComponent } from './../user-avatar-menu/user-avatar-menu.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from 'src/app/material.module';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { QEventsService } from 'src/app/services/events.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
