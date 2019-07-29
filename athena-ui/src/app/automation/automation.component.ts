import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {
  public ayehuImageSrc = "https://13.71.81.181:8442/login";

  constructor() { }

  ngOnInit() {
  }

}
