import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsListComponent } from './permissions-list.component';

describe('PermissionsListComponent', () => {
  let component: PermissionsListComponent;
  let fixture: ComponentFixture<PermissionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get remove observable', () => {
    spyOn(component.permissions$, 'remove');

    component.getRemoveItemObservable('test');
    expect(component.permissions$.remove).toHaveBeenCalled();
  });

  it('should get list observable', () => {
    spyOn(component.permissions$, 'listAll');

    component.getSearchObservable({});
    expect(component.permissions$.listAll).toHaveBeenCalled();
  });

  it('addPermission should work', () => {
    spyOn(component.dialogs, 'openAddPermission').and.callThrough();

    component.addPermission();

    expect(component.dialogs.openAddPermission).toHaveBeenCalled();
  });
});
