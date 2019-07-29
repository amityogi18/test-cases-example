import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.openOpsram();
  }

  openOpsram() {
    window.open("https://dev.m.athena-ust.com", '_blank')
  }

}
