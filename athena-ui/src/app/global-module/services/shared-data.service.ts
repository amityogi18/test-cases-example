import {
    Injectable,
    Inject
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../infrastructure/constants';

import { SharedData } from './index';

import {
    AuthService,
    HttpService,
    UtilityService,
    LoggerService
} from '@core';

import { environment } from '@env';

@Injectable()
export class SharedDataService {

    public _sharedData: SharedData;
    public isDisableUIElements: boolean;

    constructor(
        private _logger: LoggerService,
        private _authService: AuthService,
        private _https: HttpService,
        private _utilityService: UtilityService
    ) {
        this._logger.info('SharedDataService : constructor ');
    }

    getDataHeaders() {
        let authKey: any;
        authKey = JSON.parse(localStorage.getItem(Constants.localStorageKeys.apiToken));

        if (authKey) {
            let dataHeader = {
                "authKey": authKey.access_token,
            }
            return dataHeader;
        }
    }
    populateCommonData(): Promise<any> {

        this._logger.info('SharedDataService : populateCommonData ');

        if (!this._authService.isUserLoggedIn()) {
            return;
        }
        const headerData = this.getDataHeaders();
        let data = {
            data: {
                "loginUserName": "admin"
            },
            header: {
                ...headerData
            }
        }
        const url = 'http://prod.athena-ust.com/USTCloudPlatform/ui/userInfo/users/userDetails';
        const promise = this._https.post(url, data)
            .toPromise();

        promise.then(
            successResponse => {
                this._logger.info('SharedDataService : populateCommonData : successResponse ' + successResponse);
                this._sharedData = successResponse.json();
                sessionStorage.setItem("userDetails", JSON.stringify(this._sharedData));
                this._sharedData.sessionId = localStorage.getItem(Constants.localStorageKeys.sessionId);
            })
            .catch(
                errorResponse => {
                    this._logger.info('SharedDataService : populateCommonData : errorResponse ' + errorResponse);
                    const url: string = environment.appUrl + '?' + Constants.queryString.SessionExpired;
                    this._utilityService.redirectToURL(url);
                });

        return promise;

    }
}

