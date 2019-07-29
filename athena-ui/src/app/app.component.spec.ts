import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { GlobalErrorDialogComponent } from 'core-module/errorHandling/global-error-dialog.component';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from '@core';
import { DialogModule } from 'primeng/dialog';
import { BreadCrumComponent } from './shared-module/bread-crum/bread-crum.component'
import { SidebarComponent } from './shared-module/sidebar/sidebar.component'
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from "@ngx-translate/core";
import { GlobalErrorLoggingService } from 'core-module/errorHandling/global-error-logging.service';
import { NotificationService, SharedDataService } from './global-module/index';
import { AuthService } from '@core';
import { LoggerService, HttpService, } from '@core';
import { UtilityService, EnvironmentConfig } from 'core-module/infrastructure/index';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { LoaderService } from './components/service/loader.service';
import { LoadingScreenComponent } from './components/loader/loading-screen.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GlobalErrorDialogComponent,
        BreadCrumComponent,
        SidebarComponent,
        LoadingScreenComponent
      ],
      imports: [ToastModule,
        RouterModule,
        HttpModule,
        DialogModule,
        RouterTestingModule,
        TooltipModule,
        TranslateModule.forRoot(),
        LoggerModule.forRoot(
          {
            serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
          }),],
      providers: [LoggerService, NotificationService, TranslateService, ToastrService, MessageService, LoaderService, GlobalErrorLoggingService, SharedDataService, HttpService, AuthService, EnvironmentConfig, UtilityService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
