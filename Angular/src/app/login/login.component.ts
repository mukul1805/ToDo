import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginResult: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const formData = this.loginForm.value;

    this.http
      .post<{ message: string }>('http://localhost:3000/login', formData)
      .subscribe({
        next: (response) => {
          this.loginResult = response.message;
          if (response.message === 'LoginSuccess') {
            // alert('Login successful!');
            this.authService.login(); // Update login state
            this.router.navigate(['/play']);
          } else {
            alert('Login failed!');
          }
        },
        error: (error) => {
          console.error('Error during login:', error);
          this.loginResult = 'An error occurred while logging in.';
        },
      });
  }
}
