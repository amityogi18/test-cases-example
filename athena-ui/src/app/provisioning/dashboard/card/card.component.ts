import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'dashboard-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public searchText: string;
  public dashboardCardsData: any[]=[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardCardData();
  }
 
  public getDashboardCardData() {
    this.dashboardService.getDashboardCardData().subscribe(res => {
      let cardData = res;
      this.dashboardCardsData = cardData.data;
    },error=>{
      console.log(error);
    });
  }
}
