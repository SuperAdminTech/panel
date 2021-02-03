import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { StatsService } from './stats.service';

describe('StatsService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]
  }));

  it('should be created', () => {
    const service: StatsService = TestBed.get(StatsService);
    expect(service).toBeTruthy();
  });
});
