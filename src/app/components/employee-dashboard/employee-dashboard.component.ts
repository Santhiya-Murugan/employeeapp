import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { asset } from '../../models/asset.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
})
export class EmployeeDashboardComponent implements OnInit {
  assets: asset[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    // this.assetService.getAssets().subscribe((data: asset[]) => {
    //   this.assets = data;
    // });
  }
}
