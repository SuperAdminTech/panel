import { AppModule } from 'src/app/app.module';
import { TestBed } from '@angular/core/testing';

import { DialogsService } from './dialogs.service';

describe('DialogsService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const service: DialogsService = TestBed.get(DialogsService);
    expect(service).toBeTruthy();
  });
});
