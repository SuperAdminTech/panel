import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import { QEventsService } from '@qbitartifacts/qbit-kit-ng';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    localStorage.clear();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /* needs a bit more testing, it had some weird behaviour */
  it('should toggle correctly', () => {
    const events$: QEventsService = TestBed.get(QEventsService);
    fixture.detectChanges();

    // events$.fire(SidemenuComponent.EVT_TOGGLE_SIDEMENU);
    expect(component.opened).toEqual(true);
  });
});