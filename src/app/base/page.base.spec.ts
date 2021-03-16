import { AppModule } from 'src/app/app.module';
import { environment } from './../../environments/environment';
import { async, TestBed } from '@angular/core/testing';
import { PageBaseComponent } from 'src/app/base/page.base';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: '',
})
class TestPage extends PageBaseComponent {
  title = 'DASHBOARD';

  constructor(
    title: Title,
    translate: TranslateService,
    route: ActivatedRoute
  ) {
    super(title, translate, route);
  }
}

describe('PageBaseComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TestPage],
    }).compileComponents();
  }));

  it('should change title', () => {
    const fixture = TestBed.createComponent(TestPage);
    const translate$: TranslateService = TestBed.get(TranslateService);

    fixture.componentInstance.translate$.use('en');
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const expectedTitle = 'DASHBOARD | ' + environment.brand.title;

    component.setTitle('DASHBOARD');
    expect(component.title).toEqual('DASHBOARD');
    expect(component.title$.getTitle()).toEqual(expectedTitle);
  });
});
