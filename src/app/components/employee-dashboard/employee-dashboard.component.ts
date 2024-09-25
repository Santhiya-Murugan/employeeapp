import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
})
export class EmployeeDashboardComponent implements OnInit {
  assets: any[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.assetService.getAssets().subscribe((data: any[]) => {
      this.assets = data;
    });
  }

  requestAsset(assetId: number) {
    this.assetService.requestAsset(assetId).subscribe((response) => {
      console.log('Asset requested successfully', response);
    });
  }
}
