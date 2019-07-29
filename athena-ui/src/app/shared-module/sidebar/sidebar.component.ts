import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from "jquery";
import * as _ from 'lodash';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

  @Input() currentUrl: any;

  public isSidebarCollapsed: boolean = true;
  public submenus: any = [];
  public menus: any = [
    {
      submenus: [{
        label: 'Dashboard',
        routingLink: '/dashboard',
        breadcrumbs: 'Provisioning,Dashboard'
      },
      {
        label: 'Requests',
        routingLink: '/provisioning',
        breadcrumbs: 'Provisioning,Requests'
      },
      {
        label: 'Manage Requests',
        routingLink: '/allRequests',
        breadcrumbs: 'Provisioning,Manage Requests'
      }],
      routerLink: '/dashboard',
      label: 'Provisioning',
      imgURL: '../assets/Images/PROVISIONING.svg',
      hoverImgUrl: '../assets/Images/PROVISIONING_white.svg'
    },
    {
      submenus: [],
      routerLink: '/monitoring',
      label: 'Monitoring',
      imgURL: '../assets/Images/MONITORNING.svg',
      hoverImgUrl: '../assets/Images/MONITORNING_white.svg'
    },
    {
      submenus: [],
      routerLink: '/automation',
      label: 'Automation',
      imgURL: '../assets/Images/AUTOMATION.svg',
      hoverImgUrl: '../assets/Images/AUTOMATION_white.svg'
    },
    {
      submenus: [],
      routerLink: '/billing',
      label: 'Billing',
      imgURL: '../assets/Images/BILLING.svg',
      hoverImgUrl: '../assets/Images/BILLING_white.svg'
    },
    {
      submenus: [],
      routerLink: '/governance',
      label: 'Governance',
      imgURL: '../assets/Images/GOVERNANCE.svg',
      hoverImgUrl: '../assets/Images/GOVERNANCE_white.svg'
    },
    {
      submenus: [],
      routerLink: '/settings',
      label: 'Settings',
      imgURL: '../assets/Images/SETTINGS.svg',
      hoverImgUrl: '../assets/Images/SETTINGS_white.svg'
    },
    {
      submenus: [],
      routerLink: '/help',
      label: 'Help',
      imgURL: '../assets/Images/HELP.svg',
      hoverImgUrl: '../assets/Images/HELP_WHITE.svg'
    }
  ]


  @Input() showSideBar: boolean;
  @Output() menuSelected: EventEmitter<any> = new EventEmitter<any>();
  hoverIndex: number = -1;
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.currentUrl && change.currentUrl.currentValue !== change.currentUrl.previousValue) {
      const menuItem = _.find(this.menus, ['routerLink', this.currentUrl]);
      if (menuItem) {
        this.onRefreshMenu(menuItem);
      }
      else {
        this.menus.forEach(element => {
          const subMenuItem = _.find(element.submenus, ['routingLink', this.currentUrl]);
          if (subMenuItem) {
            this.onRefreshMenu(subMenuItem);
          }
        });
      }
    }
  }

  toggleSidebar = (event: any) => {
    const target = event.target;
    if ($(target).attr('id') == 'sidebar' || $(target).attr('id') == 'slideIndicator' || event === "toggle") {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      $('#sidebar').toggleClass('active');
    } else {
      $('#sidebar').addClass('active');
      this.isSidebarCollapsed = false;
    }
    if (this.isSidebarCollapsed) {
      this.submenus = [];
    }
  }

  onMenuSelect = (item) => {
    if (item.submenus !== undefined && item.routerLink) {
      this.submenus = item.submenus;
      if (this.submenus.length === 0) {
        setTimeout(() => {
          this.toggleSidebar("toggle")
        }, 500);
      }
      this.menuSelected.emit(item);
    }
    if (item.routingLink) {
      this.menuSelected.emit(item);
      this.toggleSidebar("toggle")
    }
  }

  onRefreshMenu = (item) => {
    if (item.submenus !== undefined && item.routerLink) {
      this.menuSelected.emit(item);
    }
    if (item.routingLink) {
      this.menuSelected.emit(item);
    }
  }

  fireEvent(i: number) {
    this.hoverIndex = i;
  }
}
