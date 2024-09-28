import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = 'http://localhost:8184/'; // Backend API

  constructor(private authService: AuthService) {}

  private getAuthHeaders(): { [key: string]: string } {
    return {
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    };
  }

  requestAllAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAsset`;
    const headers = this.getAuthHeaders();

    return from(
      fetch(url, {
        method: 'GET',
        headers,
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to fetch all assets');
        }
        return response.json();
      })
    );
  }

  requestAvailableAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAvailableAsset`;
    const headers = this.getAuthHeaders();

    return from(
      fetch(url, {
        method: 'GET',
        headers,
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to fetch available assets');
        }
        return response.json();
      })
    );
  }

  requestAllocatedAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAssetAllocatedToUser`;
    const headers = this.getAuthHeaders();

    return from(
      fetch(url, {
        method: 'GET',
        headers,
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Failed to fetch allocated assets');
        }
        return response.json();
      })
    );
  }

  addAssetForAdmin(assetInfor: any): Observable<any> {
    const url = `${this.baseUrl}admin/addAdmin`;
    const headers = this.getAuthHeaders();
    return from(
      fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(assetInfor),
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject('Api fetch failed');
        }
        return response.text();
      })
    );
  }
}
