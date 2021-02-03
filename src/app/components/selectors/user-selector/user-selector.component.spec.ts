import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectorComponent } from './user-selector.component';
import { AppModule } from 'src/app/app.module';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

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
    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
