import { TestBed } from '@angular/core/testing';
import { InstancesService } from './instances.service';
import { AppModule } from 'src/app/app.module';

describe('InstancesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const service: InstancesService = TestBed.get(InstancesService);
    expect(service).toBeTruthy();
  });
});
