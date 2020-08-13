import { TestBed } from '@angular/core/testing';
import { SessionCheckerService } from './session-checker.service';
import { AppModule } from '../app.module';

describe('SessionCheckerService', () => {
  let service: SessionCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.get(SessionCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Idle on action, should reset idleSecondsCounter and set to local storage', () => {
    service.idleSecondsCounter = Math.round(Math.random() * 100);
    service.idleOnAction();

    const saved = localStorage.getItem(SessionCheckerService.LS_IDLE_KEY);

    expect(service.idleSecondsCounter).toEqual(0);
    expect(Number(saved)).toBeTruthy();
  });

  it('.getIdleTime should work', () => {
    const now = new Date('6/29/2020 17:35:00').getTime();
    localStorage.setItem(SessionCheckerService.LS_IDLE_KEY, String(now));
    const lastAction = new Date('6/29/2020 17:34:00').getTime();
    expect(service.getIdleTime(lastAction)).toEqual(lastAction - now);
  });

  it('.hasIdleTimeExceededMax should work', () => {
    const now = new Date('6/29/2020 17:35:00');
    localStorage.setItem(
      SessionCheckerService.LS_IDLE_KEY,
      String(now.getTime())
    );
    const lastAction = new Date('6/29/2020 17:34:00').getTime();
    const idleTime = service.getIdleTime(lastAction);

    const hasExceeded = service.hasIdleTimeExceededMax(idleTime, 10);
    expect(hasExceeded).toEqual(true);

    const hasExceeded2 = service.hasIdleTimeExceededMax(idleTime);
    expect(hasExceeded2).toEqual(true);
  });

  it('checkIdleTime should work', () => {
    const lastAction = new Date('6/29/2020 18:00:00').getTime();
    localStorage.setItem(SessionCheckerService.LS_IDLE_KEY, lastAction + '');

    const now = new Date('6/29/2020 17:35:00').getTime();
    const idleTime = service.getIdleTime(now);
    const opened = service.checkIdleTime(idleTime);

    expect(opened).toEqual(true);
  });
});
