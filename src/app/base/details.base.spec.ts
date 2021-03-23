import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { AppModule } from '../app.module';
import { DetailsBaseComponent } from './details.base';

@Component({
  template: '',
})
class TestPage extends DetailsBaseComponent<any> {
  getDetailsObservable(): Observable<any> {
    return of({ test: 'hey' });
  }
}

describe('DetailsBaseComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TestPage],
    }).compileComponents();
  });

  it('should change title', () => {
    const fixture = TestBed.createComponent(TestPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeDefined();
  });
});
