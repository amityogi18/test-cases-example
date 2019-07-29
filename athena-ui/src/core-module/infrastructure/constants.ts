
export class Constants {

    static cookies =
        {
            sessionId: "SessionId"
        }

    static requestHeader =
        {
            authorization: "Authorization",
            sessionId: "SessionId",
            bearer: "Bearer",
            accept: "Accept",
            contentType: "Content-Type"
        }

    static apiToken = {
        refreshToken: "grant_type=refresh_token&client_id=web&refresh_token="
    }

    static contentType =
        {
            json: "application/json",
        }

    static accept = {
        json: "application/json"
    }

    static queryString = {
        SessionExpired: "SessionExpired=true",
        SessionKilled: "SessionKilled=true",
        me: "?me"
    }

    static localStorageKeys = {
        apiToken: "apiToken",
        isLoggedIn: "isLoggedIn",
        sessionId: "sessionId"
    }
}