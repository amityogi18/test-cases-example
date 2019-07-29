import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Constants } from "./shared-module/infrastructure";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let data: any;
        if (localStorage.getItem(Constants.localStorageKeys.apiToken) != null) {
            const token = JSON.parse(localStorage.getItem(Constants.localStorageKeys.apiToken));
            // if the token is  stored in localstorage add it to http 
            let dataHeader: any = {
                "authKey": token.access_token,
                "serviceRequest": "getDepartment",
                "numberOfRecords": "1",
                "tenantId": "Expanxion",
                "dataSource": "Testing"
            }
            let requestBody: any = request.body;
            if (requestBody && requestBody.data)
                data = {
                    data: {
                        ...requestBody.data
                    },
                    header: {
                        ...dataHeader
                    }
                }
            const body: any = { body: data };
            const AuthRequest = request.clone(body);
            return next.handle(AuthRequest)
        } else {
            return next.handle(request);
        }
    }
}