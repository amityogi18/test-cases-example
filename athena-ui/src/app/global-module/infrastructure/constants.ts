import { environment } from '../../../environments/environment';


export class Constants {

    static uiRoutes = {
        login: 'login',
    };

    static businessExceptions = {
        SessionExpired: 'SessionExpired',
        SessionKilled: 'SessionKilled',
        ErrorCode: 'ErrorCode',
        MessageCode: 'MessageCode'
    };

    static webApis = {
        getSharedData: environment.apiUrl + 'account/getUserData'
    };

    static queryString = {
        SessionExpired: 'SessionExpired=true'
    };

    static localStorageKeys = {
        sessionId: 'sessionId',
        apiToken: 'apiToken'
    };

    static cookies =
        {
            sessionId: 'SessionId',
            apiContext: 'apiContext'
        };

}
