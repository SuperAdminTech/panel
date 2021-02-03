import { TestBed, async } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CrudBaseService } from './crud.base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable()
class CrudTestService extends CrudBaseService {
  constructor(http: HttpClient, auth: AuthService) {
    super(
      {
        endpoint: 'app/test',
      },
      http,
      auth
    );
  }
}

class FakeAuth {
  session = {
    token: 'test-token',
  };
}

class FakeHttpClient {
  get() {
    return of({});
  }
  post() {
    return of({});
  }
  put() {
    return of({});
  }
  delete() {
    return of({});
  }
}

describe('PageBaseComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        CrudTestService,
        { provide: AuthService, useClass: FakeAuth },
        { provide: HttpClient, useClass: FakeHttpClient },
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$).toBeTruthy();
  });

  it('listAll', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$.listAll() instanceof Observable).toBeTruthy();
  });

  it('getOne', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$.getOne('test') instanceof Observable).toBeTruthy();
  });

  it('update', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$.update('test', {}) instanceof Observable).toBeTruthy();
  });

  it('create', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$.create({}) instanceof Observable).toBeTruthy();
  });

  it('remove', () => {
    const testService$: CrudTestService = TestBed.get(CrudTestService);
    expect(testService$.remove('test') instanceof Observable).toBeTruthy();
  });
});
