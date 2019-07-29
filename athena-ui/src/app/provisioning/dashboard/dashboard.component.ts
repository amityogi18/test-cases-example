import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { DashboardGrid } from '../../models/dashboard-grid.model'
import { DashboardService } from './dashboard.service'
import { ToastrService } from '@core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../components/service/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public visible: boolean = true;
  private subscriptions: Subscription = new Subscription();
  public globalFilterValue: any;
  public gridData: DashboardGrid[] = [];
  public loading: boolean;
  @ViewChild(Table) tableComponent: Table;

  constructor(private dashboardService: DashboardService, private _toastrService: ToastrService, private _router: Router,
    private loaderService:LoaderService) { }

  public ngOnInit() {
    this.loading = true;
    this.getGridData();
    this.loaderService.startLoading();
  }

  public getGridData() {
    this.subscriptions.add(this.dashboardService.getRequestGrid().subscribe(res => {
      let dashboardGridData = res;
      this.loaderService.stopLoading();
      this.loading = false;
      let provisionBtnListData = dashboardGridData.data.requestTOs.filter(function (item) {
        return item.statusTO.id === 2 || item.statusTO.id === 3 || item.statusTO.id === 8 || item.statusTO.id === 6;
      });
      provisionBtnListData = provisionBtnListData.sort(function (a, b) {
        return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
      });
      let pendingListData = dashboardGridData.data.requestTOs.filter(function (item) {
        return item.statusTO.id !== 8 && item.statusTO.id !== 6 && item.statusTO.id !== 2 && item.statusTO.id !== 3;
      });
      pendingListData = pendingListData.sort(function (a, b) {
        return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()
      });
      this.gridData = provisionBtnListData.concat(pendingListData);
    }));
  }

  public navigate(data) {
    let id = data;
    this.subscriptions.add(this.dashboardService.processRequest(id).subscribe(res => {
      let responseData = res;
      if (!responseData.header.errorFlag) {
        this._toastrService.showSuccess(`${responseData.data.message}`);
      } else {
        this._toastrService.showError(`${responseData.data.message}`);
      }
    }));
  }

  updateVisibility(): void {
    this.loading = true;
    setTimeout(() => {
      this.tableComponent.reset();
      this.globalFilterValue = '';
      this.getGridData();
      this.visible = true;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}