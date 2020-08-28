import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsListComponent } from './applications-list.component';

describe('ApplicationsListComponent', () => {
  let component: ApplicationsListComponent;
  let fixture: ComponentFixture<ApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get remove observable', () => {
    spyOn(component.applications$, 'remove');

    component.getRemoveItemObservable('test');
    expect(component.applications$.remove).toHaveBeenCalled();
  });

  it('should get list observable', () => {
    spyOn(component.applications$, 'listAll');

    component.getSearchObservable({});
    expect(component.applications$.listAll).toHaveBeenCalled();
  });

  it('addApplication should work', () => {
    spyOn(component.dialogs, 'openAddApplication').and.callThrough();

    component.addApplication();

    expect(component.dialogs.openAddApplication).toHaveBeenCalled();
  });
});
