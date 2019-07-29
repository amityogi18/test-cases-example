


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
import { ProvisioningService } from './provisioning.service';
import { ProvisioningComponent } from './provisioning.component';
import { LoaderService } from 'app/components/service/loader.service';
describe('ProvisioningService',()=>{
   let service: ProvisioningService;
   let httpTestingController: HttpTestingController;
   beforeEach(()=>{
    TestBed.configureTestingModule({
        declarations: [ProvisioningComponent],
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
        providers: [LoaderService,ProvisioningService,AuthService,ToastrService, NotificationService, LoggerService, HttpService, MessageService, 
          TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig,
          { provide: NGXLogger, useClass: class { } }]
      });
      
       service=TestBed.get(ProvisioningService);
       httpTestingController = TestBed.get(HttpTestingController);
       let store = {
 

        "header": {
        
       
        "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTc0Mjc5MSwiZXhwIjoxNTU5ODI5MTkxfQ.VbBVT0hlCX3dWzZOsKnOVK9CZ57tBZ2tP298fKeMVyk",
        
       
        "numberOfRecords": 0,
        
       
        "errorFlag": false
        
       
        },
        
       
        "data": {
        
       
        "id": 1,
        
       
        "loginUserName": null,
        
       
        "firstName": "Athena",
        
       
        "lastName": "Admin",
        
       
        "loginUserpassword": null,
        
       
        "userStatus": null,
        
       
        "email": "admin@athena.com",
        
       
        "phone": null,
        
       
        "active": null,
        
       
        "createdBy": null,
        
       
        "createdOn": null,
        
       
        "updatedBy": null,
        
       
        "updatedOn": null,
        
       
        "userHomePage": "Requests page",
        
       
        "projects": []
        
       
        }
        
       
        };
       if(sessionStorage.getItem('userDetails') == null){
        sessionStorage.setItem('userDetails', JSON.stringify(store));
       }
        
       
   });
   afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(`should issue getApplication  Request`,
    inject([HttpTestingController, ProvisioningService],
      (httpMock: HttpTestingController, service: ProvisioningService) => {
        const credit = 0;
        const mockResponse={
            "header": {
              "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTcxMjgxMSwiZXhwIjoxNTU5Nzk5MjExfQ.ohwtXHvxXyWT9OB8fxarJiUqVqT-I6eu1ahDoRA_s48",
              "serviceRequest": "getDepartment",
              "dataSource": "Testing",
              "numberOfRecords": 1,
              "tenantId": "Expanxion",
              "errorFlag": false
            },
            "data": [
              {
                "id": 2,
                "name": "DreamWorks Pictures  Database server",
                "active": true
              },
              {
                "id": 3,
                "name": "DreamWorks Pictures  APP server",
                "active": true
              }
            ]
          };
          service.getApplications(1).subscribe(data => {
          expect(data).toEqual(mockResponse);
        });
      })
  );
it(`should issue getDepartments  Request`,
    inject([HttpTestingController, ProvisioningService],
      (httpMock: HttpTestingController, service: ProvisioningService) => {
        const credit = 0;
        const mockResponse = {
            "header": {
              "authKey": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmQiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkdvdmVyYW5jZSIsIkJpbGxpbmciLCJVc2VyIG1hbmFnZW1lbnQiLCJQcm92aXNpb25pbmciLCJNb25pdG9yaW5nIiwiQXRoZW5hIEFkbWluIl0sImlhdCI6MTU1OTcxMjgxMSwiZXhwIjoxNTU5Nzk5MjExfQ.ohwtXHvxXyWT9OB8fxarJiUqVqT-I6eu1ahDoRA_s48",
              "serviceRequest": "getDepartment",
              "dataSource": "Testing",
              "numberOfRecords": 1,
              "tenantId": "Expanxion",
              "errorFlag": false
            },
            "data": [
              {
                "id": 1,
                "name": "Reliance Entertainment",
                "active": true
              },
              {
                "id": 2,
                "name": "Reliance Jio Infocomm Limited (RJIL) ",
                "active": true
              }
            ]
          };
        service.getDepartments(0).subscribe(data => {
          expect(data).toEqual(mockResponse);
        });
      })
  );
});