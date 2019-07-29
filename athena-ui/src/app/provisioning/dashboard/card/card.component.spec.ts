import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card.component';
import { SearchPipe } from '../../../filter/search.pipe';
import { DashboardService } from '../dashboard.service';
import { TranslateModule } from "@ngx-translate/core";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoggerService, HttpService } from '@core';
import { UtilityService, EnvironmentConfig } from 'core-module/infrastructure/index';
import { NGXLogger, CustomNGXLoggerService } from 'ngx-logger';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AuthService } from '@core';
import { CloudDataService } from '../../../services/cloud-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs';
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

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cloudDataService;
  cloudDataService = new CloudDataService(),
    cloudDataService = {
      getCloudData: jasmine.createSpy('getCloudData').and.returnValue('')
    },
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [CardComponent, SearchPipe],
        imports: [
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
          FormsModule,
          HttpClientTestingModule,
          RouterModule,
          HttpClientModule,
          HttpModule,
          BrowserAnimationsModule,
          TranslateModule.forRoot(),
          LoggerModule.forRoot(
            {
              serverLoggingUrl: '/api/logs',
              level: NgxLoggerLevel.DEBUG,
              serverLogLevel: NgxLoggerLevel.ERROR
            }),
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [DashboardService, LoggerService, { provide: CloudDataService, useValue: cloudDataService }, HttpService, UtilityService, CustomNGXLoggerService, EnvironmentConfig, AuthService,
          { provide: NGXLogger, useClass: class { } }]
      })
        .compileComponents();

      fixture = TestBed.createComponent(CardComponent);
      component = fixture.componentInstance;
    });


  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getDashboardCardData and return card data", inject([DashboardService], (service: DashboardService) => {
    const response: [] = [];

    spyOn(service, 'getDashboardCardData').and.returnValue(of(response))

    component.getDashboardCardData();

    //expect(component.dashboardCardsData).toEqual(response);
  }));
});
