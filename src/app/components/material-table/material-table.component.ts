import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { asset } from 'src/app/models/asset.model';
import { AssetCategory, Status } from '../../models/asset.model';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css'],
})
export class MaterialTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: MatTableDataSource<asset>;
  @Input() displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    // Any initialization logic that doesn't depend on ViewChild
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAssetCategoryString(category: AssetCategory): string {
    return AssetCategory[category];
  }

  getStatusString(status: Status): string {
    return Status[status];
  }
}
