import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TranslateModule } from "@ngx-translate/core";
import { ManageRequestsComponent } from './manage-requests.component';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
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
  MatStepperModule,
} from '@angular/material';
import { ProvisioningService } from './../provisioning.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from '@core';
import { HttpModule } from '@angular/http';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../global-module/index';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service'
import { LoggerService, HttpService } from '@core';
import { UtilityService, EnvironmentConfig } from 'core-module/infrastructure/index';
import { NGXLogger, CustomNGXLoggerService, } from 'ngx-logger';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AuthService } from '@core';
import { CloudDataService } from '../../services/cloud-data.service';
import { LoaderService } from '../../components/service/loader.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/primeng';

describe('ManageRequestsComponent', () => {
  let component: ManageRequestsComponent;
  let fixture: ComponentFixture<ManageRequestsComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ManageRequestsComponent],
      imports: [
        TranslateModule.forRoot(),
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCheckboxModule,
        MatSelectModule,
        MatExpansionModule,
        MatStepperModule,
        TableModule,
        TooltipModule,
        HttpClientTestingModule,
        HttpModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        LoggerModule.forRoot(
          {
            serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
          }),
      ],
      providers: [ProvisioningService, ToastrService, DashboardService, LoaderService, NotificationService, CloudDataService, LoggerService, HttpService, MessageService, TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig, AuthService,
        { provide: NGXLogger, useClass: class { } }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageRequestsComponent);
    component = fixture.componentInstance;
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getAllStatuses and return list of statuses", inject([ProvisioningService], (service: ProvisioningService) => {
    const response: [] = [];

    spyOn(service, 'getAllStatuses').and.returnValue(of(response))

    component.getAllStatuses();
    let event: LazyLoadEvent;
    spyOn(component, 'loadDataLazy');
    component.loadDataLazy(event);
    expect(component.loadDataLazy).toHaveBeenCalled(); 
    expect(component.allStatuses).toEqual(response);
  }));

});
