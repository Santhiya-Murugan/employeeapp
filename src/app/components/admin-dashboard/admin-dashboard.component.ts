import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import {
  asset,
  Status,
  AssetCategory,
  allocatedAsset,
  assetSeriveRequest
} from 'src/app/models/asset.model';
import { user, admin } from 'src/app/models/user.model';
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
  searchResult: MatTableDataSource<user>;
  adminResult: MatTableDataSource<admin>;
  serviceRequest: MatTableDataSource<assetSeriveRequest>;
  displayedColumns: string[] = [];
  activeBtn: number = 0;
  columnHeaders: { [key: string]: string } = {};
  assetCategorySelect: string[] = Object.keys(AssetCategory).filter((v) =>
    isNaN(Number(v))
  );
  addAssetsForm = {
    assetId: 0,
    assetName: '',
    assetCategory: '',
    assetModel: '',
    assetDescription: '',
    assetValue: 0,
    manufacturingDate: '',
    expiryDate: '',
    imageUrl: '',
    status: 'Available',
  };
  searchFormUser = {
    email: '',
    id: '',
  };
  searchFormAdmin = {
    id: '',
  };
  maxDate: string = '';
  approveRequest = {
    adminId:'',
    userId:'',
    requestId:'',
    serviceId:'',
    message:'test'
  };

  constructor(
    private assetService: AssetService,
    private loadingService: LoadingService
  ) {
    this.dataSourceAll = new MatTableDataSource<asset>([]);
    this.dataSourceAvailable = new MatTableDataSource<asset>([]);
    this.dataSourceAllocated = new MatTableDataSource<allocatedAsset>([]);
    this.searchResult = new MatTableDataSource<user>([]);
    this.adminResult = new MatTableDataSource<admin>([]);
    this.serviceRequest = new MatTableDataSource<assetSeriveRequest>([]);
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
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
      this.searchFormUser.email = '';
    } else if (field === 'email') {
      this.searchFormUser.id = '';
    }
  }

  search() {
    if (this.searchFormUser.email === '' && this.searchFormUser.id === '') {
      this.searchResult.data = [];
      return;
    }

    if (this.searchFormUser.email !== '') {
      this.loadingService.setLoadingState(true);
      this.assetService.findUserByEmail(this.searchFormUser.email).subscribe({
        next: (data) => {
          this.loadingService.setLoadingState(false);
          console.log('Data received:', data);
          const temp: user[] = [data];
          this.searchResult.data = temp;
        },
        error: (error) => {
          this.loadingService.setLoadingState(false);
          console.error('Error fetching assets:', error);
        },
      });
    }
    if (this.searchFormUser.id !== '') {
      this.loadingService.setLoadingState(true);
      this.assetService.findUserById(this.searchFormUser.id).subscribe({
        next: (data) => {
          this.loadingService.setLoadingState(false);
          console.log('Data received:', data);
          const temp: user[] = [data];
          this.searchResult.data = temp;
        },
        error: (error) => {
          this.loadingService.setLoadingState(false);
          console.error('Error fetching assets:', error);
        },
      });
    }
    console.log('Searching with:', this.searchFormUser);
  }

  clear() {
    this.searchFormUser.id = '';
    this.searchFormUser.email = '';
    this.searchResult.data = [];
    this.searchFormAdmin.id = '';
    this.adminResult.data = [];
    this.approveRequest.adminId = '';
    this.approveRequest.requestId = '';
    this.approveRequest.message = '';
    this.approveRequest.serviceId = '';
    this.approveRequest.userId = '';
  }

  isValidAssetForm(): boolean {
    if (this.addAssetsForm.assetName === '') {
      alert('Please enter Asset Name');
      return false;
    }
    if (this.addAssetsForm.assetCategory === '') {
      alert('Please select Asset Category');
      return false;
    }
    if (this.addAssetsForm.assetModel === '') {
      alert('Please enter Asset Model');
      return false;
    }
    if (this.addAssetsForm.assetDescription === '') {
      alert('Please enter Asset Description');
      return false;
    }
    if (this.addAssetsForm.assetValue === 0) {
      alert('Please enter Asset Value');
      return false;
    }
    if (this.addAssetsForm.manufacturingDate === '') {
      alert('Please select Manufacturing Date');
      return false;
    }
    if (this.addAssetsForm.expiryDate === '') {
      alert('Please select Expiring Date');
      return false;
    }

    return true;
  }

  searchAdmin() {
    if (this.searchFormAdmin.id === '') return;

    this.loadingService.setLoadingState(true);
    this.assetService.findAdminById(this.searchFormAdmin.id).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        const temp: admin[] = [data];
        this.adminResult.data = temp;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  approveAssetRequest(){
    if (this.approveRequest.requestId === '' || this.approveRequest.adminId === ''){
      if(this.approveRequest.requestId === '') alert('Please Enter Request Id');
      else alert('Please Enter Admin Id')

      return;
    }

    this.loadingService.setLoadingState(true);
    this.assetService.approveAssetRequest(this.approveRequest.adminId,this.approveRequest.requestId).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.approveRequest.message = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.log('Error fetching assets:', error);
      },
    });
  }

  approveServiceRequest(){
    if (this.approveRequest.serviceId === '' || this.approveRequest.adminId === ''){
      if(this.approveRequest.serviceId === '') alert('Please Enter Service Id');
      else alert('Please Enter Admin Id')

      return;
    }

    this.loadingService.setLoadingState(true);
    this.assetService.approveAssetServiceRequest(this.approveRequest.adminId,this.approveRequest.serviceId).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.approveRequest.message = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.log('Error fetching assets:', error);
      },
    });
  }

  approveAssetReturn(){
    if (this.approveRequest.requestId === ''){
      return;
    }
    this.loadingService.setLoadingState(true);
    this.assetService.approveAssetReturnRequest(this.approveRequest.requestId,).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.approveRequest.message = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.log('Error fetching assets:', error);
      },
    });
  }

  resignUser(){
    if (this.approveRequest.userId === ''){
      return;
    }
    this.loadingService.setLoadingState(true);
    this.assetService.resignProtocol(this.approveRequest.userId).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.approveRequest.message = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.log('Error fetching assets:', error);
      },
    });
  }

  onActionClick(action: number) {
    if (action === this.activeBtn) return;

    this.dataSourceAll.data = [];
    this.dataSourceAvailable.data = [];
    this.dataSourceAllocated.data = [];
    this.searchResult.data = [];
    this.adminResult.data = [];
    this.serviceRequest.data = [];
    this.approveRequest.message = '';
    this.approveRequest.adminId = '';
    this.approveRequest.serviceId = '';
    this.approveRequest.requestId = '';
    this.approveRequest.userId = '';
    this.searchFormUser.email = '';
    this.searchFormUser.id = '';

    this.content = action;
    this.activeBtn = action;
    if (action === 1) {
      this.getAllAssets();
    } else if (action === 2) {
      this.getAvailableAssets();
    } else if (action === 3) {
      this.getAllocatedAssets();
    } else if (action === 5) {
      this.getAllAdmins();
    } else if (action === 6) {
      this.getAllUsers();
    } else if (action === 9) {
      this.getAllocationRequests();
    } else if (action === 10) {
      this.getServiceRequest();
    } else if (action === 11) {
      this.getReturnRequest();
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
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
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
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
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
          adminId:'Admin Id',
          userId: 'User Id',
          firstName: 'First Name',
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          issuedDate: 'Issued Date',
        };
        const temp: allocatedAsset = data[0];
        this.displayedColumns = this.getKeys(temp);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  addAsset() {
    if (!this.isValidAssetForm()) return;
    this.loadingService.setLoadingState(true);
    console.log(JSON.stringify(this.addAssetsForm));
    this.assetService.addAssetForAdmin(this.addAssetsForm).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        if (data !== '') {
          alert(data);
          this.addAssetsForm = {
            assetId: 0,
            assetName: '',
            assetCategory: '',
            assetModel: '',
            assetDescription: '',
            assetValue: 0,
            manufacturingDate: '',
            expiryDate: '',
            imageUrl: '',
            status: 'Available',
          };
        } else {
          alert('Failed to insert');
        }
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  getAllAdmins() {
    this.loadingService.setLoadingState(true);
    this.assetService.getAllAdmins().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.adminResult.data = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  getAllUsers() {
    this.loadingService.setLoadingState(true);
    this.assetService.getAllUsers().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.searchResult.data = data;
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  getAllocationRequests() {
    this.loadingService.setLoadingState(true);
    this.assetService.getAllAssetAllocationRequest().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.columnHeaders = {
          requestId: 'Request Id',
          adminId: 'Admin Id',
          userId: 'User Id',
          firstName: 'First Name',
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          issuedDate: 'Issued Date',
        };
        this.dataSourceAllocated.data = data;
        const temp: allocatedAsset = data[0];
        this.displayedColumns = this.getKeys(temp);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  getServiceRequest(){
    this.loadingService.setLoadingState(true);
    this.assetService.getServiceRequest().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.columnHeaders = {
          serviceId: 'Service Id',
          userId: 'User Id',
          firstName: 'First Name',
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          serviceType: 'Service Type',
          status: 'Status',
        };
        this.serviceRequest.data = data;
        const temp: allocatedAsset = data[0];
        this.displayedColumns = this.getKeys(temp);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  getReturnRequest(){
    this.loadingService.setLoadingState(true);
    this.assetService.getReturnRequest().subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        console.log('Data received:', data);
        this.columnHeaders = {
          requestId: 'Request Id',
          adminId:'Admin Id',
          userId: 'User Id',
          firstName: 'First Name',
          assetId: 'Asset Id',
          assetName: 'Asset Name',
          issuedDate: 'Issued Date',
        };
        this.dataSourceAllocated.data = data;
        const temp: allocatedAsset = data[0];
        this.displayedColumns = this.getKeys(temp);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
        console.error('Error fetching assets:', error);
      },
    });
  }

  private getKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
  }
}
