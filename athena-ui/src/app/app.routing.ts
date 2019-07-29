import { ModuleWithProviders } from '@angular/core';

import {
    Routes,
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import { PageNotFoundComponent } from '@core';
import { AuthGuardService } from '@global';
import { LoginComponent } from './login';
import { ProvisioningComponent } from './provisioning/provisioning.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { BillingComponent } from './billing/billing.component';
import { AutomationComponent } from './automation/automation.component';
import { SettingComponent } from './setting/setting.component';
import { GovernanceComponent } from './governance/governance.component';
import { DashboardComponent } from './provisioning/dashboard/dashboard.component'
import { ManageRequestsComponent } from './provisioning/manage-requests/manage-requests.component'
import { FortunaComponent } from './fortuna/fortuna.component';
import { HelpComponent } from './help/help.component';
import { Constants } from '@shared/infrastructure/constants';

const appRoutes: Routes = [
    {
        path: Constants.uiRoutes.empty,
        component: LoginComponent
    },
    {
        path: Constants.uiRoutes.provisioning,
        component: ProvisioningComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: Constants.uiRoutes.dashboard,
        component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.allRequests,
        component: ManageRequestsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.monitoring,
        component: MonitoringComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.billing,
        component: BillingComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.automation,
        component: AutomationComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.governance,
        component: GovernanceComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: Constants.uiRoutes.settings,
        component: SettingComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: Constants.uiRoutes.help,
        component: HelpComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: Constants.uiRoutes.fortuna,
        component: FortunaComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
