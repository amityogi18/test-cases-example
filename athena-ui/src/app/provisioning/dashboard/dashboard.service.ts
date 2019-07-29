import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptionsArgs, Headers } from '@angular/http';
import { Constants } from '@shared';
import {
    LoggerService,
    HttpService,

} from '@core';
import { CloudDataService } from '../../services/cloud-data.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DashboardService {
    cloudUserId: any;
    cloudId: any;
    constructor(private http: HttpClient,
        private _logger: LoggerService, private _cloudData: CloudDataService) {
        this.cloudUserId = JSON.parse(sessionStorage.getItem("userDetails"));
        this.cloudId = this._cloudData.getCloudData().id;
    }
   
    getRequestGrid(): Observable<any> {
        let data = {
            data: {
                "cloudUserId": this.cloudUserId.data.id
            }
        }
        const url = Constants.webApis.dashboardRequestgrid;
        this._logger.info('DashboardGrid : DashboardGrid');
        return this.http.post(url, data).map(res => {
            return res;
          }, error => {
            console.log(error);
          });
    }

    processRequest(id): Observable<any> {
        let data = {
            data: {
                "requestId": id
            }
        }
        const url = Constants.webApis.dashboardProvision;
        this._logger.info('dashboardProvision : dashboardProvision');
        return this.http.post(url, data).map(res => {
            return res;
          }, error => {
            console.log(error);
          });
    }

    public getDashboardCardData(): Observable<any> {
        
        let data = {
            data: {
                "cloudUserId": this.cloudUserId.data.id,
                "cloudId": this.cloudId
            }
        }
        const url = Constants.webApis.projectCard;
        this._logger.info('ProjectCard : Project Card ');
        return this.http.post(url, data).map(res => {
            return res;
          }, error => {
            console.log(error);
          });
    }
}