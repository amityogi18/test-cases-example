import {
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '@core';
import {
    HttpError,
    ErrorCode,
    ToastrCode,
    ErroNotificationType,
    UtilityService,
    ToastrService,
    AuthService
} from '@core';

import { Constants } from '@shared';

import { LoginModel } from './login.model';

import { LoginService } from './login.service';

import { environment } from '@env';

@Component({
    moduleId: module.id,
    selector: 'login-app',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]

})
export class LoginComponent implements OnInit {

    model: LoginModel;
    showLogin = false;
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _logger: LoggerService,
        private _utilityService: UtilityService,
        private _toastrService: ToastrService,
        private _authService: AuthService
    ) {
        this._logger.info('LoginComponent : constructor ');
        this.model = new LoginModel();
        this.model.isAuthInitiated = false;
        this.model.emailAddress='';
        this.model.password='';
    }

    ngOnInit() {
        this._logger.info('LoginComponent : ngOnInit ');
        this.showLogin = true;

        if (this.isUserAuthenticated()) {
            this._router.navigate(['/dashboard']);
        }
    }

    isUserAuthenticated(){
        let flag =  this._authService.isUserLoggedIn();
        return flag;
    }
    login() {
        this._logger.info('LoginComponent : login ');
        this.model.isAuthInitiated = false;
        if (!this.model.emailAddress) {
            this._toastrService.showError(ToastrCode.EmptyEmailAddress);
        } else if (!this.model.password) {
            this._toastrService.showError(ToastrCode.EmptyPassword);
        } else {
            this.model.isAuthInitiated = true;
            const userData = {
                userLoginName: this.model.emailAddress,
                userPassWord: this.model.password
            }
            this._loginService.logOn(userData)
                .subscribe(
                    (successResponse) => {
                        this._logger.info('LoginComponent_loginService.logOn : successResponse ');
                        const response = successResponse;
                        response.code = '';
                        this.model.isAuthInitiated = false;
                        this.processLoginRequest(response);
                    },
                    (errorResponse) => {
                        this._toastrService.showError(ToastrCode.InvalidUserNameAndPassword);
                        this.resetModel();
                        this._logger.error('LoginComponent_loginService.logOn : errorResponse ');
                        this.model.isAuthInitiated = false;
                        throw new HttpError(ErrorCode.AuthFailedInvalidAuthResponse, ErroNotificationType.Dialog, errorResponse);
                    });
        }
    }

    processLoginRequest(response: any) {
        this._logger.info('LoginComponent : processLoginRequest ');
        if (response) {
            
            let authToken = JSON.parse(response._body);
            authToken.apiToken = {
                access_token: authToken.header.authKey,
                refresh_token: ''
            }
            if(authToken.header.errorFlag){
                this._toastrService.showError(ToastrCode.InvalidUserNameAndPassword)
                return;
            }
            localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');
            localStorage.setItem(Constants.localStorageKeys.apiToken, JSON.stringify(authToken.apiToken));
            localStorage.setItem(Constants.localStorageKeys.sessionId, authToken.header.authKey);
            if (authToken && authToken.data) {
                if (authToken.data.userLoginName) {
                    localStorage.setItem(Constants.localStorageKeys.userName, authToken.data.userLoginName);
                }
                if (authToken.data.firstName) {
                    localStorage.setItem(Constants.localStorageKeys.firstName, authToken.data.firstName);
                }

                if (authToken.data.lastName) {
                    localStorage.setItem(Constants.localStorageKeys.lastName, authToken.data.lastName);
                }
            }

            this._utilityService.redirectToURL(environment.appUrl);
        }
    }

    resetModel() {
        this._logger.info('LoginComponent : resetModel ');
        this.model.emailAddress = '';
        this.model.password = '';
    }
}
