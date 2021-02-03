import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsComponent } from './application-details.component';
import { AppModule } from 'src/app/app.module';

describe('ApplicationDetailsComponent', () => {
  let component: ApplicationDetailsComponent;
  let fixture: ComponentFixture<ApplicationDetailsComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
