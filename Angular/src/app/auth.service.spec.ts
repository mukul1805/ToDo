import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    localStorage.clear(); // Clear localStorage before each test
  });

  afterEach(() => {
    localStorage.clear(); // Ensure localStorage is clean after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isAuthenticated to true and store isLoggedIn in localStorage on login', () => {
    service.login();
    expect(service['isAuthenticated']).toBeTrue(); // Check internal state
    expect(localStorage.getItem('isLoggedIn')).toBe('true'); // Check localStorage
  });

  it('should set isAuthenticated to false and remove isLoggedIn from localStorage on logout', () => {
    service.login(); // Simulate login first
    service.logout();
    expect(service['isAuthenticated']).toBeFalse(); // Check internal state
    expect(localStorage.getItem('isLoggedIn')).toBeNull(); // Check localStorage
  });

  it('should return true if authenticated directly', () => {
    service.login();
    expect(service.checkAuthentication()).toBeTrue(); // Should return true after login
  });

  it('should return true if isLoggedIn is found in localStorage', () => {
    localStorage.setItem('isLoggedIn', 'true'); // Simulate stored login state
    expect(service.checkAuthentication()).toBeTrue(); // Should detect from localStorage
  });

  it('should return false if not authenticated and no isLoggedIn in localStorage', () => {
    expect(service.checkAuthentication()).toBeFalse(); // No login or localStorage
  });
});
