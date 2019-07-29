import { LoginService } from './login.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async ,inject} from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from '@core';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "@ngx-translate/core";
import { NotificationService } from '../global-module/index';
import { RouterModule } from '@angular/router';
import { CloudDataService } from '../services/cloud-data.service';
import { LoginComponent } from './login.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatExpansionModule,
  MatStepperModule
} from '@angular/material';
import { LoggerService, HttpService } from '@core';
import { UtilityService, EnvironmentConfig } from 'core-module/infrastructure/index';
import { NGXLogger, CustomNGXLoggerService, } from 'ngx-logger';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AuthService } from '@core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { By } from "@angular/platform-browser";
import { DebugElement } from '@angular/core';
describe('LoginService',()=>{
   let service: LoginService;
   let httpTestingController: HttpTestingController;
   beforeEach(()=>{
    
    TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          BrowserAnimationsModule,
          MatButtonModule,
          MatCardModule,
          MatIconModule,
          MatInputModule,
          MatProgressSpinnerModule,
          MatDialogModule,
          MatCheckboxModule,
          MatSelectModule,
          MatExpansionModule,
          FormsModule,
          ReactiveFormsModule,
          MatStepperModule,
          HttpClientModule,
          BrowserModule,
          HttpClientTestingModule,
          RouterTestingModule,
          RouterModule,
          HttpModule,
          LoggerModule.forRoot(
            {
              serverLoggingUrl: '/api/logs',
              level: NgxLoggerLevel.DEBUG,
              serverLogLevel: NgxLoggerLevel.ERROR
            }),
          TranslateModule.forRoot()
        ],
        providers: [LoginService,AuthService,ToastrService, NotificationService, LoggerService, HttpService, MessageService, 
          TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig,
          { provide: NGXLogger, useClass: class { } }]
      });
       service=TestBed.get(LoginService);
       httpTestingController = TestBed.get(HttpTestingController);    
   });
   afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
it(`should issue logon`,
    inject([HttpTestingController, LoginService],
      (httpMock: HttpTestingController, service: LoginService) => {
        const credit = {userLoginName: "admin", userPassWord: "admin"};
        const mockResponse = {
            "_body": "{\"header\":{\"authKey\":\"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTY1MTU5NCwiZXhwIjoxNTU5NzM3OTkzfQ.S4IgFOShv1lOxpS2raiAVYh0ExXCvoCg2OVFhH9ckbM\",\"dataSource\":\"Testing\",\"numberOfRecords\":1,\"tenantId\":\"Expanxion\",\"flagSuccessFailure\":\"Success\",\"errorFlag\":false},\"data\":{\"userLoginName\":\"admin\",\"loggingInFromCountry\":\"India\",\"userStatusDesc\":\"Cloud Administrator\",\"firstName\":\"Athena\",\"lastName\":\"Admin\"}}",
            "status": 200,
            "ok": true,
            "statusText": "OK",
            "headers": {
              "pragma": [
                "no-cache"
              ],
              "content-type": [
                "application/json;charset=utf-8"
              ],
              "cache-control": [
                "no-cache",
                " no-store",
                " max-age=0",
                " must-revalidate"
              ],
              "expires": [
                "0"
              ]
            },
            "type": 2,
            "url": "http://dev.athena-ust.com/USTCloudPlatform/login"
          };
        service.logOn(credit).subscribe(data => {
          expect(data).toEqual(mockResponse);
        });
      })
  );
});