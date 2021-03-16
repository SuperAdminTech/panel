import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationSelectorComponent } from './application-selector.component';
import { AppModule } from 'src/app/app.module';

describe('ApplicationSelectorComponent', () => {
  let component: ApplicationSelectorComponent;
  let fixture: ComponentFixture<ApplicationSelectorComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
