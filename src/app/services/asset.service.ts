import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = 'http://localhost:4200/'; // Backend API

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  requestAllAssetsForAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/showAsset`, this.getAuthHeaders());
  }

  requestAvailableAssetsForAdmin(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/showAvailableAsset`,
      this.getAuthHeaders()
    );
  }

  requestAllocatedAssetsForAdmin(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/showAssetAllocatedToUser`,
      this.getAuthHeaders()
    );
  }
}
