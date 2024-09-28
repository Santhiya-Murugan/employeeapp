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
  credentials = { email: '', password: '' };
  selectedRole = 'admin';
  error = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  // login field validation
  isValid(): boolean {
    if (this.credentials.email === '') {
      alert('Please enter Email');
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

    const isAdmin: boolean = this.selectedRole === 'admin';
    this.loadingService.setLoadingState(true);
    this.authService.login(this.credentials, isAdmin).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.authService.addToLocalStorage('token', data);
        if (this.selectedRole === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/employee-dashboard']);
        }
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
        this.error = 'error';
      },
    });

    // this.authService.addToLocalStorage('token', 'empty token');
    // this.authService.addToLocalStorage('username', this.credentials.email);
    // if (isAdmin) {
    //   this.router.navigate(['/admin-dashboard']);
    // } else {
    //   this.router.navigate(['/employee-dashboard']);
    // }
  }
}
