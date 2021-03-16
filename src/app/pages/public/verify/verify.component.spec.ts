import { Title } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyComponent } from './verify.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from '../../../app.module';

describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [{ provide: Title, useClass: Title }],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
