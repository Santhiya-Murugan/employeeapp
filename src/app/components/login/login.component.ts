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

    const isAdmin: boolean = this.selectedRole === 'admin';
    // this.loadingService.setLoadingState(true);
    // this.authService.login(this.credentials, isAdmin).subscribe({
    //   next: (data) => {
    //     this.loadingService.setLoadingState(false);
    //     console.log('Data received:', data);
    //     this.authService.addToLocalStorage('token', data.token);
    //     this.authService.addToLocalStorage(
    //       'username',
    //       this.credentials.username
    //     );
    //     if (this.selectedRole === 'admin') {
    //       this.router.navigate(['/admin-dashboard']);
    //     } else {
    //       this.router.navigate(['/employee-dashboard']);
    //     }
    //   },
    //   error: (error) => {
    //     this.loadingService.setLoadingState(false);
    //     console.error('Error fetching assets:', error);
    //   },
    // });
    this.authService.addToLocalStorage('token', 'empty token');
    this.authService.addToLocalStorage('username', this.credentials.username);
    // if (response.role === 'admin') {
    if (isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/employee-dashboard']);
    }
    // });
  }
}
