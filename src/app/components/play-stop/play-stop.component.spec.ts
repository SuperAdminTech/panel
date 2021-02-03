import { By } from '@angular/platform-browser';
import { MaterialModule } from './../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStopComponent } from './play-stop.component';

describe('PlayStopComponent', () => {
  let component: PlayStopComponent;
  let fixture: ComponentFixture<PlayStopComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStopComponent],
      imports: [MaterialModule],
    }).compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => {
    fixture = TestBed.createComponent(PlayStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input correctly', () => {
    component.state = 'play';
    fixture.detectChanges();
    const valueEl = fixture.debugElement.query(By.css('#play-stop'));
    expect(valueEl.attributes['ng-reflect-value']).toBe('play');
  });

  it('Click on button should emit chage event', (done) => {
    component.changedState.subscribe((resp) => {
      expect(resp).toBe('play');
      done();
    });

    const valueEl = fixture.debugElement.query(By.css('#play'));
    valueEl.nativeElement.click();
  });
});
