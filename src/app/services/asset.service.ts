import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl = 'http://localhost:8184/'; // Backend API

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
  }

  requestAllAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAsset`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  requestAvailableAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAvailableAsset`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  requestAllocatedAssetsForAdmin(): Observable<any> {
    const url = `${this.baseUrl}admin/showAssetAllocatedToUser`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  addAssetForAdmin(assetInfo: any): Observable<string> {
    const url = `${this.baseUrl}admin/addAsset`;
    console.log(url,this.getAuthHeaders());
    return this.http.post(url, assetInfo, { 
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  findUserById(id: string): Observable<any> {
    const url = `${this.baseUrl}admin/findUserById/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  findUserByEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}admin/findUserByEmail/${email}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getAllAdmins(): Observable<any> {
    const url = `${this.baseUrl}admin/showAll`;
    console.log(url);
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}admin/showAllUsers`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  findAdminById(id: string): Observable<any> {
    const url = `${this.baseUrl}admin/findAdminById/${id}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getAllAssetAllocationRequest(): Observable<any> {
    const url = `${this.baseUrl}admin/showAssetAllocationRequest`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getServiceRequest(): Observable<any> {
    const url = `${this.baseUrl}admin/showAssetServiceRequest`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getReturnRequest(): Observable<any> {
    const url = `${this.baseUrl}admin/showAssetReturnRequest`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  approveAssetRequest(adminId:string,requestId:string): Observable<string> {
    const url = `${this.baseUrl}admin/approveAssetRequest/${adminId}/${requestId}`;
    return this.http.post(url,null, { headers: this.getAuthHeaders(), responseType:'text' });
  }

  approveAssetServiceRequest(adminId:string,serviceId:string): Observable<string> {
    const url = `${this.baseUrl}admin/approveAssetServiceRequest/${adminId}/${serviceId}`;
    return this.http.post(url,null, { headers: this.getAuthHeaders(), responseType:'text' });
  }

  approveAssetReturnRequest(requestId:string): Observable<string> {
    const url = `${this.baseUrl}admin/approveAssetReturnRequest/${requestId}`;
    return this.http.post(url,null, { headers: this.getAuthHeaders(), responseType:'text' });
  }

  resignProtocol(resignProtocol:string): Observable<string> {
    const url = `${this.baseUrl}admin/resignProtocol/${resignProtocol}`;
    return this.http.post(url,null, { headers: this.getAuthHeaders(),responseType: 'text' });
  }
}