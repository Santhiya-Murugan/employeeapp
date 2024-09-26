import { Component } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { asset, Status, AssetCategory } from 'src/app/models/asset.model';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  serviceRequests: any[] = [];
  content: number = 0;
  dataSourceAll: any;
  dataSourceAvailable: any;
  dataSourceAllocated: any;
  displayedColumns: string[] = [
    'assetId',
    'assetName',
    'assetCategory',
    'assetModel',
    'assetDescription',
    'assetValue',
    'manufacturingDate',
    'expiryDate',
    'status',
  ];
  activeBtn: number = 0;

  constructor(
    private assetService: AssetService,
    private loadingService: LoadingService
  ) {}

  onActionClick(action: number) {
    console.log(`clicked ${action}`);
    this.content = action;
    this.activeBtn = action;
    if (action === 1) {
      this.getAllAssets();
    } else if (action === 2) {
      this.getAvailableAssets();
    } else if (action === 3) {
      this.getAllocatedAssets();
    }
  }
  getAllAssets() {
    // let response = this.assetService.requestAllAssets();
    this.loadingService.setLoadingState(true);
    const temp: asset[] = [];
    for (let i = 1; i <= 50; i++) {
      temp.push({
        assetId: i,
        assetName: `All Asset ${i}`,
        assetCategory: AssetCategory.Car,
        assetModel: `All Asset Model ${i}`,
        assetDescription: `All Asset Description ${i}`,
        assetValue: `All Asset Value ${i}`,
        manufacturingDate: `All some date ${i}`,
        expiryDate: `All some date ${i}`,
        imageUrl: `All some URL ${i}`,
        status: Status.Available,
      });
    }
    this.dataSourceAll = new MatTableDataSource<asset>(temp);
    this.loadingService.setLoadingState(false);
  }
  getAvailableAssets() {
    // let response = this.assetService.requestAvailableAssets();
    this.loadingService.setLoadingState(true);
    const temp: asset[] = [];
    for (let i = 1; i <= 50; i++) {
      temp.push({
        assetId: i,
        assetName: `Available Asset ${i}`,
        assetCategory: AssetCategory.Car,
        assetModel: `Available Asset Model ${i}`,
        assetDescription: `Available Asset Description ${i}`,
        assetValue: `Available Asset Value ${i}`,
        manufacturingDate: `Available some date ${i}`,
        expiryDate: `Available some date ${i}`,
        imageUrl: `Available some URL ${i}`,
        status: Status.Available,
      });
    }
    this.dataSourceAvailable = new MatTableDataSource<asset>(temp);
    this.loadingService.setLoadingState(false);
  }
  getAllocatedAssets() {
    // let response = this.assetService.requestAllocatedAssets();
    this.loadingService.setLoadingState(true);
    const temp: asset[] = [];
    for (let i = 1; i <= 50; i++) {
      temp.push({
        assetId: i,
        assetName: `Allocated Asset ${i}`,
        assetCategory: AssetCategory.Car,
        assetModel: `Allocated Asset Model ${i}`,
        assetDescription: `Allocated Asset Description ${i}`,
        assetValue: `Allocated Asset Value ${i}`,
        manufacturingDate: `Allocated some date ${i}`,
        expiryDate: `Allocated some date ${i}`,
        imageUrl: `Allocated some URL ${i}`,
        status: Status.Available,
      });
    }
    this.dataSourceAllocated = new MatTableDataSource<asset>(temp);
    this.loadingService.setLoadingState(false);
  }
}
