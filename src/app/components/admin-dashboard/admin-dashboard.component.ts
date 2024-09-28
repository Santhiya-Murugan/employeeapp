import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import {
  asset,
  Status,
  AssetCategory,
  allocatedAsset,
} from 'src/app/models/asset.model';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements AfterViewInit {
  @ViewChild('actionsContainer') actionsContainer!: ElementRef;

  serviceRequests: any[] = [];
  content: number = 0;
  dataSourceAll: MatTableDataSource<asset>;
  dataSourceAvailable: MatTableDataSource<asset>;
  dataSourceAllocated: MatTableDataSource<allocatedAsset>;
  displayedColumns: string[] = [];
  activeBtn: number = 0;
  columnHeaders: { [key: string]: string } = {};
  assetCategorySelect: string[] = Object.keys(AssetCategory).filter((v) =>
    isNaN(Number(v))
  );
  addAssetsForm = {
    assetName: '',
    assetCategory: '',
    assetModel: '',
    assetDescription: '',
    assetValue: '',
    manufacturingDate: '',
    expiryDate: '',
    imageUrl: '',
  };
  searchForm = {
    email: '',
    id: '',
  };

  constructor(
    private assetService: AssetService,
    private loadingService: LoadingService
  ) {
    this.dataSourceAll = new MatTableDataSource<asset>([]);
    this.dataSourceAvailable = new MatTableDataSource<asset>([]);
    this.dataSourceAllocated = new MatTableDataSource<allocatedAsset>([]);
  }

  ngAfterViewInit() {
    this.setupScrollButtons();
  }

  setupScrollButtons() {
    const container = this.actionsContainer.nativeElement;
    const leftArrow = document.getElementById('scroll-left');
    const rightArrow = document.getElementById('scroll-right');

    if (leftArrow && rightArrow) {
      leftArrow.addEventListener('mousedown', () => {
        container.scrollBy({ left: -800, behavior: 'smooth' });
      });

      rightArrow.addEventListener('mousedown', () => {
        container.scrollBy({ left: 800, behavior: 'smooth' });
      });
    }
  }
  onInputChange(field: 'id' | 'email') {
    if (field === 'id') {
      this.searchForm.email = '';
    } else {
      this.searchForm.id = '';
    }
  }

  search() {
    // Implement your search logic here
    console.log('Searching with:', this.searchForm);
  }

  clear() {
    this.searchForm.id = '';
    this.searchForm.email = '';
  }

  onActionClick(action: number) {
    if (action === this.activeBtn) return;

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
    this.loadingService.setLoadingState(true);
    this.assetService.requestAllAssetsForAdmin().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.dataSourceAll.data = data;
        this.columnHeaders = {
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          assetCategory: 'Category',
          assetModel: 'Asset Model',
          assetDescription: 'Description',
          assetValue: 'Value',
          manufacturingDate: 'Mfg.Date',
          expiryDate: 'Exp.Date',
          imageUrl: 'Image',
          status: 'Status',
        };
        const temp: asset = data[0];
        this.displayedColumns = this.getKeys(temp);
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
    // const temp: asset[] = [];
    // for (let i = 1; i <= 50; i++) {
    //   temp.push({
    //     assetId: i,
    //     assetName: `All Asset ${i}`,
    //     assetCategory: AssetCategory.Car,
    //     assetModel: `All Asset Model ${i}`,
    //     assetDescription: `All Asset Description ${i}`,
    //     assetValue: `All Asset Value ${i}`,
    //     manufacturingDate: `All some date ${i}`,
    //     expiryDate: `All some date ${i}`,
    //     imageUrl: `All some URL ${i}`,
    //     status: Status.Available,
    //   });
    // }
  }

  getAvailableAssets() {
    this.loadingService.setLoadingState(true);
    this.assetService.requestAvailableAssetsForAdmin().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.dataSourceAvailable.data = data;
        this.columnHeaders = {
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          assetCategory: 'Category',
          assetModel: 'Asset Model',
          assetDescription: 'Description',
          assetValue: 'Value',
          manufacturingDate: 'Mfg.Date',
          expiryDate: 'Exp.Date',
          imageUrl: 'Image',
          status: 'Status',
        };
        const temp: asset = data[0];
        this.displayedColumns = this.getKeys(temp);
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
    // const temp: asset[] = [];
    // for (let i = 1; i <= 50; i++) {
    //   temp.push({
    //     assetId: i,
    //     assetName: `Available Asset ${i}`,
    //     assetCategory: AssetCategory.Car,
    //     assetModel: `Available Asset Model ${i}`,
    //     assetDescription: `Available Asset Description ${i}`,
    //     assetValue: `Available Asset Value ${i}`,
    //     manufacturingDate: `Available some date ${i}`,
    //     expiryDate: `Available some date ${i}`,
    //     imageUrl: `Available some URL ${i}`,
    //     status: Status.Available,
    //   });
    // }
  }

  getAllocatedAssets() {
    this.loadingService.setLoadingState(true);
    this.assetService.requestAllocatedAssetsForAdmin().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.dataSourceAllocated.data = data;
        this.columnHeaders = {
          requestId: 'Request Id',
          adminId: 'Admin Id',
          userId: 'User Id',
          firstName: 'First Name',
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          issuedDate: 'Issued Date',
        };
        const temp: allocatedAsset = data[0];
        this.displayedColumns = this.getKeys(temp);
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
    const temp: allocatedAsset[] = [];
    for (let i = 1; i <= 50; i++) {
      temp.push({
        requestId: i,
        adminId: i,
        userId: i,
        firstName: `first name ${i}`,
        assetId: i,
        assetName: `asset name ${i}`,
        issuedDate: `issued date ${i}`,
      });
    }
  }
  addAsset() {}
  private getKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
  }
}
