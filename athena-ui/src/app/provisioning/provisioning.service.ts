import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '@shared';
import { HttpClient } from '@angular/common/http';
import {
  LoggerService,
  HttpService,

} from '@core';
import { LoaderService } from '../components/service/loader.service';

@Injectable()
export class ProvisioningService {
  cloudId: any;
  constructor(private http: HttpClient,
    private _logger: LoggerService,
    private loader: LoaderService) {
    this.cloudId = JSON.parse(sessionStorage.getItem("userDetails"));
  }

  getDepartments(cloudId): Observable<any> {
    this.loader.startLoading();
    let data = {
      data: {
        "cloudUserId": this.cloudId.data.id,
        "cloudId": cloudId,
      }
    }
    const url = Constants.webApis.department;
    this._logger.info('Department : department ');
    return this.http.post(url, data).map(res => {
      this.loader.stopLoading();
      return res;
    }, error => {
      console.log(error);
    });
  }

  getProjects(departmentId, cloudId): Observable<any> {
    let data = {
      data: {
        "cloudUserId": this.cloudId.data.id,
        "cloudId": cloudId,
        "departmentId": departmentId
      }
    }
    const url = Constants.webApis.project;
    this._logger.info('Projects : projects ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getApplications(projectId): Observable<any> {
    let data = {
      data: {
        "projectId": projectId
      }
    }
    const url = Constants.webApis.application;
    this._logger.info('Application : application ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getEnvironments(projectId): Observable<any> {
    let data = {
      data: {
        "projectId": projectId
      }
    }
    const url = Constants.webApis.environment;
    this._logger.info('Environment : environment ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getCatalogs(cloudId, projectId): Observable<any> {
    let data = {
      data: {
        "cloudId": cloudId,
        "projectId": projectId
      }
    }
    const url = Constants.webApis.catalogs;
    this._logger.info('Catalog : catalog ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getCatalogById(catalogId): Observable<any> {
    let data = {
      data: {
        "catalogId": catalogId
      }
    }
    const url = Constants.webApis.catalogById;
    this._logger.info('CatalogParam : catalogParam ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  provisioningSubmitData(finalData): Observable<any> {
    let data = {
      ...finalData,
    }
    const url = Constants.webApis.provision;
    this._logger.info('Provision : Provision ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getAllRequestGrid(gridData): Observable<any> {
    let data = {
      data: {
        "searchString": gridData.searchString,
        "statusId": gridData.statusId,
        "pageNumber": gridData.pageNumber,
        "numberOfRecords": gridData.numberOfRecords
      },
    }
    const url = Constants.webApis.allRequestsDataGrid;
    this._logger.info('allRequestsDataGrid : allRequestsDataGrid ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }

  getAllStatuses(): Observable<any> {
    let data = {
      data: {
      }
    }
    const url = Constants.webApis.allStatusesData;
    this._logger.info('allStatusesData : allStatusesData ');
    return this.http.post(url, data).map(res => {
      return res;
    }, error => {
      console.log(error);
    });
  }
}