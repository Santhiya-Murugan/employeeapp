import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  selectedRole = 'user';
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

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
    console.log(this.selectedRole);
    this.loadingService.setLoadingState(true);
    setTimeout(() => {
      this.loadingService.setLoadingState(false);
    }, 2000);

    // this.loadingService.setLoadingState(true);
    // this.authService.login(this.credentials).subscribe((response) => {
    // this.loadingService.setLoadingState(false);
    // localStorage.setItem('token', response.token);
    this.authService.addToLocalStorage('token', 'empty token');
    this.authService.addToLocalStorage('username', this.credentials.username);
    // if (response.role === 'admin') {
    const role = 'admin';
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/employee-dashboard']);
    }
    // });
  }
}
