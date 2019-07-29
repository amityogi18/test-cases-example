import { Component, OnInit, Input } from '@angular/core';
import { LoggerService } from '@core';
import { TranslateService } from '@ngx-translate/core';
import { Event as RouterEvent, Router, NavigationStart, NavigationEnd, } from '@angular/router';
import {
    NotificationService,
    SharedDataService
} from './global-module/index';
import {
    ConfigurationSettings,
    Constants
} from '@shared';
import {
    AuthService
} from '@core';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isUserLoggedIn = false;
    showSideBar: boolean = false;
    breadCrubms: any = "";
    public fortunaID: number = -1;

    public currentUrl: any;

    constructor(
        private _logger: LoggerService,
        private _translate: TranslateService,
        private _router: Router,
        private _authService: AuthService,
        private _notificationService: NotificationService,
        private _sharedDataService: SharedDataService
    ) {

        this._logger.info('AppComponent : constructor ');

        this._logger.info('"AppComponent : constructor => language configured');

        _translate.addLangs(ConfigurationSettings.supportedBrowserLanguages);
        _translate.setDefaultLang(ConfigurationSettings.fallbackBrowserLanguage);

        const browserLang = _translate.getBrowserLang();

        this._logger.info('AppComponent : constructor => Current browserLang Is :' + browserLang);

        const languageConfiguredForApplication = browserLang.match(
            ConfigurationSettings.supportedBrowserLanguages.join('|'))
            ? browserLang : ConfigurationSettings.fallbackBrowserLanguage;

        _translate.use(languageConfiguredForApplication);
        this._logger.info('AppComponent : constructor => Application language is set to :' + languageConfiguredForApplication);

        this._router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                if (res.url && res.url.length > 1) {
                    this.currentUrl = res.url;
                }
            }
        });

    }

    ngOnInit() {
        this.isUserLoggedIn = this._authService.isUserLoggedIn();
        this._logger.info('AppComponent : ngOnInit() ');
    }

    onWindowResized(event: any) {

    }

    toggleSidebar = () => {
        this.showSideBar = !this.showSideBar;
    }

    toggleHeader = (event) => {
        this.fortunaID = event.id;
        if (event.id == 3) {
            this._router.navigate(['/fortuna']);
        }
    }

    menuSelected = (event) => {
        if (event.breadcrumbs) {
            this.breadCrubms = event.breadcrumbs.split(",");
            console.log("event", event);
        }
        else {
            if (event && event.submenus.length > 0) {
                this.breadCrubms = event.submenus[0].breadcrumbs.split(",");
            }
            else {
                this.breadCrubms = "";
            }
        }
    }
}
