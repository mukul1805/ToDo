import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['checkAuthentication']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    authService.checkAuthentication.and.returnValue(true); // Mock the authenticated state

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue(); // Ensure navigation is allowed
    expect(authService.checkAuthentication).toHaveBeenCalledTimes(1); // Verify the method was called
    expect(router.navigate).not.toHaveBeenCalled(); // Ensure no redirection happened
  });

  it('should redirect to /login if the user is not authenticated', () => {
    authService.checkAuthentication.and.returnValue(false); // Mock unauthenticated state

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse(); // Ensure navigation is not allowed
    expect(authService.checkAuthentication).toHaveBeenCalledTimes(1); // Verify the method was called
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Ensure redirection happened
  });
});
