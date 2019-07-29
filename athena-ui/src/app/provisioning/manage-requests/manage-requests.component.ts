import { Component, OnInit } from '@angular/core';
import { ProvisioningService } from '../provisioning.service'
import { ManageRequstGrid } from '../../models/manage-requests-grid.model'
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.scss']
})
export class ManageRequestsComponent implements OnInit {
  public gridData: any[] = [];
  public allRequstGrid: ManageRequstGrid;
  public loading: boolean;
  public totalRecords: number;
  public allStatuses: any[]=[];
  public selectedStatusId: string;
  public focused:boolean =false;
  public isStatusChanged: boolean =false;
  public globalFilterValue: string = "";
  constructor(private provisioningService: ProvisioningService) {
    this.allRequstGrid = new ManageRequstGrid();
  }
  statusChange(){
    this.isStatusChanged =true;
  }
  ngOnInit() {
    this.getAllStatuses();
    this.loading = true;
  }

  public getAllStatuses() {
    this.provisioningService.getAllStatuses().subscribe((response) => {
      let allStatuses = response;
      this.allStatuses = allStatuses.data.statusTOs;
    });
  }
  onBlur(){
  this.focused =false;
  }
  onFocus(){
    this.focused =true;
  }
  public loadDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.allRequstGrid.searchString = this.globalFilterValue;
    this.allRequstGrid.statusId = this.selectedStatusId ? this.selectedStatusId : "";
    if(this.isStatusChanged){
      this.allRequstGrid.pageNumber = 0; 
      this.isStatusChanged =false;
    }else if (event.first > 0 && this.allRequstGrid.searchString.length> 0 && this.focused == true) {
      this.allRequstGrid.pageNumber = 0; 
    }
    else if (event.first > 0 && this.allRequstGrid.searchString.length> 0 && this.focused == false) {
      this.allRequstGrid.pageNumber = event.first / event.rows;
    }else if (event.first > 0 && this.allRequstGrid.searchString.length == 0 && this.focused == true) {
      this.allRequstGrid.pageNumber = 0;
    }else if (event.first > 0 && this.allRequstGrid.searchString.length == 0 && this.focused == false) {
      this.allRequstGrid.pageNumber = event.first / event.rows;
    }
    else {
      this.allRequstGrid.pageNumber = event.first;
    }
    this.allRequstGrid.numberOfRecords = event.rows;
    this.provisioningService.getAllRequestGrid(this.allRequstGrid).subscribe(
      res => {
        let allRequstGridData = res;
        this.gridData = allRequstGridData.data.manageRequestTOs;
        this.totalRecords = allRequstGridData.data.totalRecords;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
}
