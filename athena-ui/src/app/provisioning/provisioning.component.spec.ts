import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProvisioningComponent } from './provisioning.component';
import { ProvisioningService } from './provisioning.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from '@core';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "@ngx-translate/core";
import {NotificationService} from '../global-module/index';
import { RouterModule } from '@angular/router';
import { CloudDataService } from '../services/cloud-data.service';
import { LoaderService } from '../components/service/loader.service';
import { HttpClientModule } from '@angular/common/http';
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

describe('ProvisioningComponent', () => {
  let component: ProvisioningComponent;
  let fixture: ComponentFixture<ProvisioningComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProvisioningComponent],
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
      providers: [ProvisioningService, ToastrService, LoaderService, NotificationService, LoggerService, HttpService, MessageService, TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig, AuthService,
        { provide: NGXLogger, useClass: class { } }]
    }).compileComponents()

    fixture = TestBed.createComponent(ProvisioningComponent);
    component = fixture.componentInstance;
  });

  it('should create app', () => {
    expect(component).toBeTruthy();
  });

  // it('form invalid when empty', () => {
  //   let name = component.stepperOneForm.controls["name"];
  //   name.setValue("Jhon");
  //   let department = component.stepperOneForm.controls["department"];
  //   department.setValue("Jhon");
  //   let project = component.stepperOneForm.controls["project"];
  //   project.setValue("Jhon");
  //   let environment = component.stepperOneForm.controls["environment"];
  //   environment.setValue("Jhon");
  //   let application = component.stepperOneForm.controls["application"];
  //   application.setValue("Jhon");
  //   let remark = component.stepperOneForm.controls["remark"];
  //   remark.setValue("Jhon");
  //   let autoProvision = component.stepperOneForm.controls["autoProvision"];
  //   autoProvision.setValue("Jhon");
  //   expect(component.stepperOneForm.valid).toBeTruthy();
  // });
});
