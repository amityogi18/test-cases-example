import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '@core/core.module';
import { GlobalModule } from '@global/global.module';
import { routing } from './app.routing';
import { ProvisioningModule } from './provisioning/provisioning.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { BillingModule } from './billing/billing.module';
import { AutomationModule } from './automation/automation.module';
import { GovernanceModule } from './governance/governance.module';
import { SettingModule } from './setting/setting.module';
import { LoginComponent } from './login/index';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from '@shared/shared.module';
import { MaterialModuleModule } from './material-module/material-module.module';
import { ChartsModule } from 'ng2-charts';
import { FortunaComponent } from './fortuna/fortuna.component';
import { CloudDataService } from './services/cloud-data.service';
import { HelpComponent } from './help/help.component';
import { LoadingScreenComponent } from './components/loader/loading-screen.component';
import { LoaderService } from './components/service/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './JWTInterceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FortunaComponent,
    HelpComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    MaterialModuleModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule.forRoot(
      {
        environmentName: environment.environmentName
        , apiTokenUrl: ''
        , appUrl: environment.appUrl
        , domain: environment.domain
      }),
    GlobalModule.forRoot(),
    SharedModule,
    ProvisioningModule,
    MonitoringModule,
    BillingModule,
    AutomationModule,
    GovernanceModule,
    SettingModule,
    routing,
    ChartsModule,
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }, CloudDataService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
