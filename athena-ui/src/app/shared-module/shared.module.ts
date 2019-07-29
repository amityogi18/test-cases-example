import {
    NgModule,
    ErrorHandler
} from '@angular/core';

import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
    Routes,
    RouterModule
} from '@angular/router';

// plugins

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
    RestrictInput,
    EnableDisableControls
} from './directive/index';

import { ConfigurationSettings } from './infrastructure/index';

import {
    LogoutConfirmationComponent,
    HeaderComponent
} from './header/index';

import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadCrumComponent } from './bread-crum/bread-crum.component'
import { TooltipModule } from 'primeng/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    DatexPipe,
    EllipsisPipe,
    SafeHtmlPipe,
    SplitPipe
} from './pipes/index';;
import { MaterialModuleModule } from '../material-module/material-module.module';
//import { SidebarModule } from './sidebar/sidebar.module';

declare var resourcesVersion: any;

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + resourcesVersion);
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        DialogModule,
        ToastModule,
        TooltipModule,
        NgbModule,
        MaterialModuleModule,
        NgbCarouselModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        // pipes
        DatexPipe,
        EllipsisPipe,
        SafeHtmlPipe,
        SplitPipe,

        // directives
        RestrictInput,
        EnableDisableControls,

        // components
        NavigationComponent,
        SidebarComponent,
        SpinnerComponent,
        HeaderComponent,
        LogoutConfirmationComponent,
        FooterComponent,
        BreadCrumComponent
    ],
    providers: [

    ],
    exports: [
        // Angular modules
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        MaterialModuleModule,
        // plugins
        DialogModule,
        ToastModule,
        NgbCarouselModule,
        TranslateModule,

        // pipes
        DatexPipe,
        EllipsisPipe,
        SafeHtmlPipe,
        SplitPipe,

        // directives
        RestrictInput,
        EnableDisableControls,

        // shared components
        NavigationComponent,
        SidebarComponent,
        SpinnerComponent,
        HeaderComponent,
        LogoutConfirmationComponent,
        FooterComponent,
        BreadCrumComponent
    ]
})

export class SharedModule { }
