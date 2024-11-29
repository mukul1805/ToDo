import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    const authServiceMock = jasmine.createSpyObj('AuthService',['login']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should have a valid form when fields are filled', () => {
    component.loginForm.setValue({ username: 'admintest', password: 'password777' });
    expect(component.loginForm.valid).toBeTrue();
  });

  xit('should call AuthService login on successful login', () => {
    component.loginResult = 'LoginSuccess';
    component.onLogin();
    expect(authServiceSpy.login).toHaveBeenCalled();
  });

});
