import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoadingComponent } from './list-loading.component';
import { AppModule } from 'src/app/app.module';

describe('ListLoadingComponent', () => {
  let component: ListLoadingComponent;
  let fixture: ComponentFixture<ListLoadingComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  }); beforeEach(() => {
    fixture = TestBed.createComponent(ListLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
