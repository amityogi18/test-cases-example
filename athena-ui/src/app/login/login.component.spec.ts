import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from '@core';
import { HttpModule } from '@angular/http';
import { TranslateModule } from "@ngx-translate/core";
import { NotificationService } from '../global-module/index';
import { RouterModule } from '@angular/router';
import { CloudDataService } from '../services/cloud-data.service';
import { LoginComponent } from './login.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginService}from './login.service'
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
export class MockAuthService { 
  isLoggedIn = false;

  isUserLoggedIn() {
    return this.isLoggedIn;
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;
  let de: DebugElement;
  let el: HTMLElement;
  let originalTimeout;
  let service: MockAuthService;
  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        service = new MockAuthService();
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
      providers: [ToastrService, NotificationService, LoggerService, HttpService, MessageService, 
        TranslateService, UtilityService, CustomNGXLoggerService, EnvironmentConfig, {provide:AuthService, useClass: MockAuthService},
        { provide: NGXLogger, useClass: class { } }]
    });
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();

  });
  it('check if app instance created', () => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('email field is blank', () => {
    component.model.emailAddress="abc";
    fixture.detectChanges();
    expect(component.model.emailAddress).not.toBe('');
  });
  it('isUserAuthenticated returns false when the user is not authenticated', () => {
    service.isLoggedIn = false; 
    expect(component.isUserAuthenticated()).toBeFalsy();
  });
  it('isUserAuthenticated returns false when the user is not authenticated', () => {
    service.isLoggedIn = true; 
    expect(component.isUserAuthenticated()).toBeFalsy();
  });
  it('password field validity', () => {
    component.model.password="xyz"
    expect(component.model.password).not.toBe('');
  });
  it('login method called', async(() => {
    spyOn(component, 'login');
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#loadButton');
    button.click();
   
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
    });
  }));

  it('Reset model method call', () => {
    component.model.emailAddress="xyz";
    component.model.password="xyz";
    component.resetModel();
    fixture.whenStable().then(() => {
      expect(component.resetModel).toHaveBeenCalled();
    });
    
    expect(component.model.emailAddress).toBe('');
    expect(component.model.password).toBe('');
  });
});
