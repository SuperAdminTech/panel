import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderComponent } from './table-header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TableHeaderComponent', () => {
  let component: TableHeaderComponent;
  let fixture: ComponentFixture<TableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with input', () => {
    component.options.input = true;
    fixture.detectChanges();

    const valueEl = fixture.debugElement.query(By.css('.search-input'));
    expect(valueEl).toBeTruthy();
  });

  it('should create without input', () => {
    component.options.input = false;
    fixture.detectChanges();

    const valueEl = fixture.debugElement.query(By.css('.search-input'));
    expect(valueEl).not.toBeTruthy();
  });

  it('clear works', () => {
    component.options.input = false;
    component.query = 'test';
    fixture.detectChanges();

    component.clear();

    expect(component.query).toBe('');
  });

  it('on search works', () => {
    component.options.newItem = true;
    fixture.detectChanges();

    const mock = {
      sub: () => {},
    };
    spyOn(mock, 'sub');
    component.onSearch.subscribe(mock.sub);
    component.search();

    expect(mock.sub).toHaveBeenCalled();
  });

  it('on search works from input change', (done) => {
    component.options.newItem = true;
    fixture.detectChanges();

    const mock = {
      sub: () => {},
    };
    spyOn(mock, 'sub');
    component.onSearch.subscribe(mock.sub);

    const valueEl = fixture.debugElement.query(By.css('.search-input'));
    valueEl.nativeElement.value = '';
    valueEl.triggerEventHandler('keyup', { value: '' });
    fixture.detectChanges();

    setTimeout(() => {
      expect(mock.sub).toHaveBeenCalledWith('');
      done();
    }, 600);
  });
});

describe('TableHeaderComponent with route params', () => {
  let component: TableHeaderComponent;
  let fixture: ComponentFixture<TableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock
            queryParams: of({
              query: 'my search',
            }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set search from params', (done) => {
    fixture.detectChanges();
    setTimeout(() => {
      const valueEl = fixture.debugElement.query(By.css('.search-input'));
      expect(component.query).toBe('my search');
      expect(valueEl.nativeElement.value).toBe('my search');
      done();
    });
  });
});
