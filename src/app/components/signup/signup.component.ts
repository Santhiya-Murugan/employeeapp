import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  credentials = {
    adminId: 0,
    firstName: '',
    lastName: '',
    phoneno: '',
    email: '',
    password: '',
    reTypePassword: '',
    status: null,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  isValid(): boolean {
    if (this.credentials.firstName === '') {
      alert('Please enter username');
      return false;
    } else if (this.credentials.lastName === '') {
      alert('Please enter lastName');
      return false;
    } else if (this.credentials.phoneno === '') {
      alert('Please enter phoneno');
      return false;
    } else if (this.credentials.email === '') {
      alert('Please enter email');
      return false;
    } else if (this.credentials.email === '') {
      alert('Please enter email');
      return false;
    } else if (this.credentials.password === '') {
      alert('Please enter password');
      return false;
    } else if (this.credentials.reTypePassword === '') {
      alert('Please enter password');
      return false;
    }
    return true;
  }
  // In your component.ts
  validateNumber(event: KeyboardEvent): void {
    const input = event.key;
    // Only allow digits (0-9)
    if (!/^\d+$/.test(input)) {
      event.preventDefault();
    }
  }

  register() {
    if (!this.isValid()) {
      return;
    }

    this.loadingService.setLoadingState(true);
    setTimeout(() => {
      this.loadingService.setLoadingState(false);
    }, 2000);

    // this.loadingService.setLoadingState(true);
    // this.authService.signup(this.credentials).subscribe((response) => {
    // this.loadingService.setLoadingState(false);
    //});
    this.router.navigate(['/login']);
  }
}
