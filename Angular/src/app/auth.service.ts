import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated= false;

  login(): void {
    console.log("login() ran...")
    this.isAuthenticated=true;
    localStorage.setItem('isLoggedIn','true');
  }

  logout(): void {
    console.log("Logout() ran...")
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    // localStorage.clear();
  }

  checkAuthentication(): boolean {
    console.log("Authentication checked via auth service")
    return this.isAuthenticated || localStorage.getItem('isLoggedIn')==='true';
  }
}
