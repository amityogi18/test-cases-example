import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './../dashboard/dashboard.component'
import { ProvisioningService } from './../provisioning.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from '@core';
import { HttpModule } from '@angular/http';
import { GraphComponent } from './graph/graph.component';
import { TableModule } from 'primeng/table';
import { CardComponent } from './card/card.component';
import { SearchPipe } from '../../filter/search.pipe';
import { TranslateModule } from "@ngx-translate/core";
import { NotificationService } from '../../global-module/index';
import { DataTableModule, MultiSelectModule, DropdownModule, SliderModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { LoaderService } from '../../components/service/loader.service';
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
import { CloudDataService } from '../../services/cloud-data.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let cloudDataService;
  beforeEach(async () => {
    cloudDataService = new CloudDataService()
    cloudDataService = {
      getCloudData: jasmine.createSpy('getCloudData').and.returnValue('')
    }
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, GraphComponent, CardComponent, SearchPipe],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        DataTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCheckboxModule,
        MultiSelectModule,
        DropdownModule,
        MatSelectModule,
        MatExpansionModule,
        SliderModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RouterModule,
        ChartsModule,
        HttpModule,
        TableModule,
        LoggerModule.forRoot(
          {
            serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
          }),
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [ProvisioningService, ToastrService, DashboardService, LoaderService, NotificationService, { provide: CloudDataService, useValue: cloudDataService }, LoggerService, HttpService, MessageService, TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig, AuthService,
        { provide: NGXLogger, useClass: class { } }]
    }).compileComponents()

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create app', inject([CloudDataService], (service: CloudDataService) => {
    expect(service).toBeTruthy();
    expect(component).toBeTruthy();
  }));

  it("should call getRequestGrid and return list of statuses", inject([DashboardService], (service: DashboardService) => {
    const response: [] = [];

    spyOn(service, 'getRequestGrid').and.returnValue(of(response))

    component.getGridData();

    expect(component.gridData).toEqual(response);
  }));
});
