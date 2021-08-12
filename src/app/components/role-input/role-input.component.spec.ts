import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleInputComponent } from './role-input.component';

describe('RoleInputComponent', () => {
  let component: RoleInputComponent;
  let fixture: ComponentFixture<RoleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
