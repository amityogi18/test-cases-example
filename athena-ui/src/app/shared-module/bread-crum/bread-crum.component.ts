import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bread-crum',
  templateUrl: './bread-crum.component.html',
  styleUrls: ['./bread-crum.component.scss']
})
export class BreadCrumComponent implements OnInit {

  @Input() public menuItems: any = [];
  constructor() { }

  ngOnInit() {

  }

}
