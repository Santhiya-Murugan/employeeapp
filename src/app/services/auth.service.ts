import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8184/'; // Backend API URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: any, isAdmin: boolean): Observable<string> {
    const url = isAdmin
      ? `${this.baseUrl}admin/login`
      : `${this.baseUrl}user/login`;

    return this.http.post(url, credentials, { responseType: 'text' });
  }

  signup(userInfo: any, isAdmin: boolean): Observable<string> {
    const url = isAdmin
      ? `${this.baseUrl}admin/addAdmin`
      : `${this.baseUrl}user/addUser`;

    return this.http.post(url, userInfo,{ responseType: 'text' });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // return !this.jwtHelper.isTokenExpired(token);
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('username');
  }

  addToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
  }
}
