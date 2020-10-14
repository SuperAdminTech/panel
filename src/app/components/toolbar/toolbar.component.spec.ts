import { UserAvatarMenuComponent } from './../user-avatar-menu/user-avatar-menu.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from 'src/app/material.module';
import { AppModule } from 'src/app/app.module';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { By } from '@angular/platform-browser';
import { QEventsService } from 'src/app/services/events.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidemenu correctly', () => {
    const events$: QEventsService = TestBed.get(QEventsService);
    fixture.detectChanges();

    const mock = {
      sub: (evt) => console.log('clicked'),
    };
    spyOn(mock, 'sub');

    events$.on(SidemenuComponent.EVT_TOGGLE_SIDEMENU).subscribe(mock.sub);

    fixture.debugElement
      .query(By.css('#sidemenu-toggle'))
      .nativeElement.click();

    expect(mock.sub).toHaveBeenCalled();
  });
});
