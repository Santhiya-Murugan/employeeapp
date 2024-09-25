import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  serviceRequests: any[] = [];

  constructor(private assetService: AssetService) {}

  onActionClick() {
    console.log('clicked');
  }

  updateRequestStatus(requestId: number, status: string) {
    this.assetService
      .updateRequestStatus(requestId, status)
      .subscribe((response) => {
        console.log('Service request updated', response);
      });
  }
}
