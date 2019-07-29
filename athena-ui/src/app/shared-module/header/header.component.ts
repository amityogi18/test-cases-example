import {
    Component,
    OnInit,
    ViewChild,
    ChangeDetectionStrategy,
    ElementRef,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core';

import { Router } from '@angular/router';

import { LoggerService } from '@core';
import { CloudDataService } from '../../services/cloud-data.service';


import {
    SharedDataService,
    NotificationService
} from '@global';

import {
    ConfigurationSettings,
    Constants
} from '../infrastructure/index';

import {
    LogoutConfirmationComponent
} from './logout/logout-confirmation.component';

import {
    HttpError,
    ErrorCode,
    ErroNotificationType,
    UtilityService,
    AuthService
} from '@core';

import { environment } from '@env';
import { ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
    encapsulation: ViewEncapsulation.None
    @ViewChild('logout')
    logoutComp: LogoutConfirmationComponent;
    navbarOpen: boolean = false;
    @ViewChild('userNavigationMenu') userNavigationMenu: ElementRef;

    @ViewChild('profile') profile: ElementRef;

    userName: string;
    public showProfile: boolean = false;
    public loggedInUserData: any = {
        'firstName': null,
        'lastName': null,
        'userName': null,
        'profileInitials': null
    }

    public cloudOptions: any = [
        { id: 0, title: 'All Clouds', imgURL: '../assets/Images/cloud.svg' },
        { id: 1, title: 'AWS', imgURL: '../assets/Images/AWS.svg' },
        { id: 2, title: 'AZURE', imgURL: '../assets/Images/Azure.svg' },
        { id: 3, title: 'FORTUNA', imgURL: '../assets/Images/fortuna_color.png' }
    ]

    @Output() public toggleSidebar = new EventEmitter();
    @Output() public changeHeader = new EventEmitter();

    selectedVAlue: string = this.cloudOptions[0].title;
    imageUrl: any = this.cloudOptions[0].imgURL;

    constructor(
        private _router: Router,
        private _logger: LoggerService,
        private _sharedDataService: SharedDataService,
        private _utilityService: UtilityService,
        private _authService: AuthService,
        private _notificationService: NotificationService,
        private _cloudDataService: CloudDataService
    ) {
        this._logger.info('HeaderComponent : constructor ');
        this.userName = this._sharedDataService._sharedData.firstName;
        let profileInitials_: string = null;
        if (localStorage) {
            if (localStorage.getItem(Constants.localStorageKeys.firstName)) {
                this.loggedInUserData.firstName = localStorage.getItem(Constants.localStorageKeys.firstName);
                profileInitials_ = this.getProfileInitials(this.loggedInUserData.firstName);
            }
            if (localStorage.getItem(Constants.localStorageKeys.lastName)) {
                this.loggedInUserData.lastName = localStorage.getItem(Constants.localStorageKeys.lastName);
                profileInitials_ += this.getProfileInitials(this.loggedInUserData.lastName);
            }
            if (localStorage.getItem(Constants.localStorageKeys.userName)) {
                this.loggedInUserData.userName = localStorage.getItem(Constants.localStorageKeys.userName);
            }
            this.loggedInUserData.profileInitials = profileInitials_;
        }
    }

    ngOnInit() {
        this._logger.info('HeaderComponent : ngOnInit');
        if (this.selectedVAlue) {
            this._cloudDataService.setCloudData(this.cloudOptions[0]);
        }

    }
    getProfileInitials(input: string): string {
        return (input && input.length > 0) ? input.charAt(0).toUpperCase() : '';
    }
    show() {
        this.showProfile = !this.showProfile;
    }
    menuButtonClick() {
        this.toggleSidebar.emit();
    }

    toggleHeader(value) {
        this.changeHeader.emit(value);
        this._cloudDataService.setCloudData(value);
        this._notificationService.reset(true);
        this.imageUrl = value.imgURL;
    }

    showLogoutConfirmation() {
        this._logger.info('HeaderComponent : showLogoutConfirmation ');
        //this.logoutComp.showConfirmation();
        this.logoutUser();
    }

    logoutUser() {
        this._logger.info('HeaderComponent : logOut : Success ');
        localStorage;
        sessionStorage;
        this._utilityService.redirectToURL(environment.appUrl);
        localStorage.clear();
        sessionStorage.clear();
    }

    onLogoutConfirmation(eventData: boolean) {
        this._logger.info('HeaderComponent : onLogoutConfirmation ');
        const logoutURL = environment.appUrl;
        this._authService.logOut(Constants.webApis.logout)
            .subscribe(
                (successResponse) => {
                    this._logger.info('HeaderComponent : logOut : Success ');
                    const url: string = environment.appUrl + '?' + Constants.queryString.SessionExpired;
                    localStorage.clear();
                    if (successResponse.url.indexOf(Constants.queryString.SessionExpired) >= 0
                        || successResponse.url.indexOf(Constants.queryString.SessionKilled) >= 0) {
                        this._utilityService.redirectToURL(url);
                        return;
                    }
                    if (successResponse.headers.get(Constants.requestHeader.contentType) !== Constants.contentType.json) {
                        this._utilityService.redirectToURL(url);
                        return;
                    }
                    const response = successResponse.json();
                    this._utilityService.redirectToURL(environment.appUrl);
                },
                (errorResponse) => {
                    this._logger.error('HeaderComponent : logOut : Error');
                    this._utilityService.redirectToURL(logoutURL);
                });
    }

    openInNewWindow(url: string) {
        this._logger.info('HeaderComponent : openInNewWindow ');
        this._utilityService.openInNewWindow(url);
    }

    toggleUserMenu(closeMenu?: boolean) {
        const classOpen = 'open';
        if (!this.userNavigationMenu.nativeElement.classList.contains(classOpen)
            && (closeMenu === undefined || closeMenu === false)) {
            this.userNavigationMenu.nativeElement.classList.add(classOpen);
        } else {
            this.userNavigationMenu.nativeElement.classList.remove(classOpen);
        }
    }

    gotoHomePage() {
        this.selectedVAlue = this.cloudOptions[0].title;
        this.toggleHeader({ id: 0, title: 'All Clouds', imgURL: '../assets/Images/cloud.svg' })
        this._router.navigate(['/dashboard']);
    }
    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    @HostListener('document:click', ['$event'])
    onClickOfOtherComponent(e: Event) {
        if (e.target != this.profile.nativeElement)
            this.showProfile = false;
    }
}
