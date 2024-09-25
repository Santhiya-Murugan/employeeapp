import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = 'http://localhost:8080/api/assets'; // Backend API

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  getAssets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, this.getAuthHeaders());
  }

  requestAsset(assetId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/request`,
      { assetId },
      this.getAuthHeaders()
    );
  }

  getServiceRequests(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/service-requests`,
      this.getAuthHeaders()
    );
  }

  updateRequestStatus(requestId: number, status: string): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/service-requests/${requestId}`,
      { status },
      this.getAuthHeaders()
    );
  }
}
