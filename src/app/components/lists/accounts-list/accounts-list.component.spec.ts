import { AppModule } from 'src/app/app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsListComponent } from './accounts-list.component';
import { DialogsService } from 'src/app/services/dialogs.service';
import { of } from 'rxjs';

class DialogsServiceMock {
  openAddAccount() {
    console.log('openAddAccount');
    return {
      afterClosed() {
        return of('test');
      },
    };
  }
}

describe('AccountsListComponent', () => {
  let component: AccountsListComponent;
  let fixture: ComponentFixture<AccountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: DialogsService, useClass: DialogsServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get remove observable', () => {
    spyOn(component.accounts$, 'remove');

    component.getRemoveItemObservable('test');
    expect(component.accounts$.remove).toHaveBeenCalled();
  });

  it('addAccount should work', () => {
    spyOn(component.dialogs, 'openAddAccount').and.callThrough();

    component.addAccount();

    expect(component.dialogs.openAddAccount).toHaveBeenCalled();
  });
});
