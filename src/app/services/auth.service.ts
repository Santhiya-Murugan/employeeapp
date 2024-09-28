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

  login(credentials: any, isAdmin: boolean): Observable<any> {
    if (isAdmin) {
      return this.http.post(`${this.baseUrl}admin/login`, credentials);
    } else {
      return this.http.post(`${this.baseUrl}user/login`, credentials);
    }
  }
  signup(userInfo: any, isAdmin: boolean): Observable<any> {
    if (isAdmin) {
      return this.http.post(`${this.baseUrl}admin/addAdmin`, userInfo);
    } else {
      return this.http.post(`${this.baseUrl}user/addUser`, userInfo);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return true;
    // return !this.jwtHelper.isTokenExpired(token);
    // uncomment when api is completed
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

  getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
        // Only add Authorization header if the token exists
      }),
    };
  }
}
