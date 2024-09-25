import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4200/'; // Backend API URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/loginUser`, credentials);
  }
  signup(userInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/loginUser`, userInfo);
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
