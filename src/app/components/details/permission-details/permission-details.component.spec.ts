import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsDetailsComponent } from './permission-details.component';
import { AppModule } from 'src/app/app.module';

describe('PermissionsDetailsComponent', () => {
  let component: PermissionsDetailsComponent;
  let fixture: ComponentFixture<PermissionsDetailsComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
