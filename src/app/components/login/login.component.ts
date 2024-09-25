import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  // login field validation
  isValid(): boolean {
    if (this.credentials.username === '') {
      alert('Please enter username');
      return false;
    } else if (this.credentials.password === '') {
      alert('Please enter password');
      return false;
    }
    return true;
  }

  // login event handler
  login() {
    if (!this.isValid()) {
      return;
    }
    // this.authService.login(this.credentials).subscribe((response) => {
    // localStorage.setItem('token', response.token);
    localStorage.setItem('token', 'empty token');
    // if (response.role === 'admin') {
    if ('admin' === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/employee-dashboard']);
    }
    // });
  }
}
