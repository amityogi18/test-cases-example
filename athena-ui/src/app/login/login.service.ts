import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    LoggerService,
    HttpService,

} from '@core';

import { Constants } from '@shared';
import { RequestOptionsArgs, Headers } from '@angular/http';



@Injectable()
export class LoginService {

    constructor(
        private _http: HttpService,
        private _logger: LoggerService
    ) {
        this._logger.info('LoginService : constructor ');
    }

    getHeaders() {
        const options: RequestOptionsArgs = { headers: new Headers() };
        options.withCredentials = false;
        options.headers.set(Constants.requestHeader.accept, Constants.contentType.json);
        options.headers.set(Constants.requestHeader.contentType, Constants.contentType.json);
        return options;
    }

    logOn(request: any): Observable<any> {
        let data = {
            "header": {
                "authKey": "",
                "numberOfRecords": "1",
                "tenantId": "Expanxion",
                "dataSource": "Testing"
            },
            "data": {
                ...request,
                "loggingInFromCountry": 'India',
                "numberOfAttempts": "1",
            }
        }
        const url = Constants.webApis.login;
        this._logger.info('LoginService : logOn ');
        return this._http.post(url, JSON.stringify(data), this.getHeaders()).map(res => {
            return res;
        }, error => {
            console.log(error);
        });
    }


}
