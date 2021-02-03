import { IdleNotificationComponent } from './idle.dia';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

export const MockMatRef = {
  close(dialogResult?: any) {},
};

describe('IdleNotificationComponent', () => {
  let component: IdleNotificationComponent;
  let fixture: ComponentFixture<IdleNotificationComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: MatDialogRef, useValue: MockMatRef }],
    }).compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => {
    fixture = TestBed.createComponent(IdleNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return <true> if "keepAlive" is executed', () => {
    const ref = TestBed.get(MatDialogRef);
    spyOn(ref, 'close');

    component.resetCounter();

    expect(ref.close).toHaveBeenCalledWith(true);
  });

  it('should return <value> if "close" is executed', () => {
    const ref = TestBed.get(MatDialogRef);
    spyOn(ref, 'close');

    component.close(false);
    expect(ref.close).toHaveBeenCalledWith(false);
  });

  it('should return <true> if "button" is clicked', () => {
    const ref = TestBed.get(MatDialogRef);
    spyOn(ref, 'close');

    const valueEl = fixture.debugElement.query(By.css('#idleModalContinue'));
    valueEl.nativeElement.click();

    expect(ref.close).toHaveBeenCalledWith(true);
  });
});
