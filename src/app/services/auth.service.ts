import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8184/'; // Backend API URL
  private jwtHelper = new JwtHelperService();

  constructor() {}

  login(credentials: any, isAdmin: boolean): Observable<string> {
    const url = isAdmin
      ? `${this.baseUrl}admin/login`
      : `${this.baseUrl}user/login`;

    return from(
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Login failed');
        }
        return response.text();
      })
    );
  }

  signup(userInfo: any, isAdmin: boolean): Observable<any> {
    const url = isAdmin
      ? `${this.baseUrl}admin/addAdmin`
      : `${this.baseUrl}user/addUser`;

    return from(
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Signup failed');
        }
        return response.json();
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // return true;
    return !this.jwtHelper.isTokenExpired(token);
    // uncomment when API is completed
  }

  getToken(): string | undefined {
    return localStorage.getItem('token') || undefined;
  }

  getUserName(): string | undefined {
    return localStorage.getItem('username') || undefined;
  }

  addToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  private getAuthHeaders(): { [key: string]: string } {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    };
  }
}
