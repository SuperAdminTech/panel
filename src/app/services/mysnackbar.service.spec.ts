import { AppModule } from 'src/app/app.module';
import { TestBed } from '@angular/core/testing';
import { MySnackBarService } from './mysnackbar.service';

describe('MySnackBarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [MySnackBarService],
    })
  );

  it('should be created', () => {
    const service: MySnackBarService = TestBed.get(MySnackBarService);
    expect(service).toBeTruthy();
  });
});
