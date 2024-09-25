import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  serviceRequests: any[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.assetService.getServiceRequests().subscribe((requests: any[]) => {
      this.serviceRequests = requests;
    });
  }

  updateRequestStatus(requestId: number, status: string) {
    this.assetService
      .updateRequestStatus(requestId, status)
      .subscribe((response) => {
        console.log('Service request updated', response);
      });
  }
}
