import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fortuna',
  templateUrl: './fortuna.component.html',
  styleUrls: ['./fortuna.component.scss']
})
export class FortunaComponent implements OnInit {
  @ViewChild('resizeIframe') resizeIframe: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
