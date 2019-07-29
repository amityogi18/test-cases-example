import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProvisioningComponent } from './provisioning.component';
import { MaterialModuleModule } from './../material-module/material-module.module';
import { ProvisioningService } from './provisioning.service';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DataTableModule, MultiSelectModule, DropdownModule, SliderModule } from 'primeng/primeng';
import { DashboardService } from './dashboard/dashboard.service';
import { GraphComponent } from './dashboard/graph/graph.component';
import { CardComponent } from './dashboard/card/card.component';
import { ChartsModule } from 'ng2-charts';
import { SearchPipe } from '../filter/search.pipe';
import { TableModule } from 'primeng/table';
import { ManageRequestsComponent } from './manage-requests/manage-requests.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [{ path: '', component: ProvisioningComponent },
{ path: 'dashboard', component: DashboardComponent }];

declare var resourcesVersion: any;

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + resourcesVersion);
}

@NgModule({
  declarations: [ProvisioningComponent, DashboardComponent, GraphComponent, CardComponent, SearchPipe, ManageRequestsComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ChartsModule,
    TableModule,
    RouterModule,
    NgbModule,
    TooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [ProvisioningComponent, RouterModule],
  providers: [ProvisioningService, DashboardService]
})
export class ProvisioningModule { }
