import { TestBed } from '@angular/core/testing';

import { StrategiesService } from './strategies.service';
import { AppModule } from 'src/app/app.module';

describe('StrategiesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const service: StrategiesService = TestBed.get(StrategiesService);
    expect(service).toBeTruthy();
  });
});
