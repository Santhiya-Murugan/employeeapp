import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { user, } from 'src/app/models/user.model';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  credentials = {
    firstName: '',
    lastName: '',
    phoneno: '',
    address: '',
    email: '',
    password: '',
    status: '',
    reTypePassword: '',
  };

  passwordsMatch: boolean = true;
  selectedRole = 'admin';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  isValid(): boolean {
    if (this.credentials.firstName === '') {
      alert('Please enter First Name');
      return false;
    } else if (this.credentials.lastName === '') {
      alert('Please enter Last Name');
      return false;
    } else if (this.credentials.phoneno === '') {
      alert('Please enter Phone Number');
      return false;
    } else if (this.credentials.address === '') {
      alert('Please enter Address');
      return false;
    } else if (this.credentials.email === '') {
      alert('Please enter Email');
      return false;
    } else if (this.credentials.password === '') {
      alert('Please enter Password');
      return false;
    } else if (this.credentials.reTypePassword === '') {
      alert('Please enter Re-Type Password');
      return false;
    } else if (this.credentials.password !== this.credentials.reTypePassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  }

  validateNumber(event: KeyboardEvent): void {
    const input = event.key;
    // Only allow digits (0-9)
    if (!/^\d+$/.test(input)) {
      event.preventDefault();
    }
  }

  checkPasswordMatch() {
    this.passwordsMatch =
      this.credentials.password === this.credentials.reTypePassword;
  }

  register() {
    if (!this.isValid()) {
      return;
    }

    this.loadingService.setLoadingState(true);
    const isAdmin: boolean = this.selectedRole == 'admin';
    delete (this.credentials as any).reTypePassword; // delete's retype pwd from object

    console.log(JSON.stringify(this.credentials));
    this.authService.signup(this.credentials, isAdmin).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        if (data !== null) {
          alert(`${isAdmin?'Admin':'User'} Registered Successfuly`)
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }
}
