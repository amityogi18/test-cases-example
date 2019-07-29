import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'dashboard-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  // Doughnut  Graph Component 
  public doughnutChartLabels: Label[] = ['Tomcat Sql Linux', 'Linux Server', 'Tomcat Windows', 'Tomcat Linux'];
  public doughnutChartData: MultiDataSet = [
    [190, 150, 100, 80]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: any = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#43425D',
        fontFamily: 'Roboto, Regular',
        usePointStyle: true,
        padding: 15
      }
    },
    responsive: true
  }
  public doughnutColors: any[] = [
    { backgroundColor: ["#3AB75C", "#582A2A", "#43425D", "#D9434E"] },
    { borderColor: ["#3AB75C", "#582A2A", "#43425D", "#D9434E"] }];

  public doughnutChartGraphTitle: string = "My Catalogs";

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart) {
      const ctx = chart.ctx;
      let txt2 = 'Catalogs Used';
      let data0: any = chart.data.datasets[0].data[0]
      let data1: any = chart.data.datasets[0].data[1]
      let data2: any = chart.data.datasets[0].data[2]
      let data3: any = chart.data.datasets[0].data[3];
      let txt1 = data0 + data1 + data2 + data3;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

      // Pick a new font size so it will not be larger than the height of label.
      const fontSizeToUse = 7;
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = 'black';

      // Draw text in center
      ctx.fillText(txt2, centerX, centerY - 10);
      var fontSizeToUse1 = 7;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillText(txt1, centerX, centerY + 10);
    }
  }];

  ////Bar Graph chart 

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#43425D',
        fontFamily: 'Roboto, Regular',
        usePointStyle: true,
        padding: 15
      }
    },
    scales: {
      xAxes: [{
        maxBarThickness: 40,
      }]
    }
  };
  public barChartLabels: Label[] = [""];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartGraphTitle: string = "Trending in Organization";
  public barChartData: ChartDataSets[] = [
    {
      "label": "Tomcat Sql Linux",
      "data": [
        170
      ],
      "fill": false,
      "backgroundColor": [
        "rgba(58, 183, 92, 1)",
      ],
      "borderColor": [
        "rgba(58, 183, 92, 1)",
      ],
      "hoverBackgroundColor": ["rgba(58, 183, 92, 1)"],
      "hoverBorderColor": ["rgba(58, 183, 92, 1)"],
      "borderWidth": 1
    }, {
      "label": "Linux Server",
      "data": [
        150
      ],
      "fill": false,
      "backgroundColor": [
        "rgba(67, 66, 93, 1)",
      ],
      "borderColor": [
        "rgba(67, 66, 93, 1)",
      ],
      "hoverBackgroundColor": ["rgba(67, 66, 93, 1)"],
      "hoverBorderColor": ["rgba(67, 66, 93, 1)"],
      "borderWidth": 1
    },
    {
      "label": "Tomcat Windows",
      "data": [
        115
      ],
      "fill": true,
      "backgroundColor": [
        "rgba(88, 42, 42, 1)",
      ],
      "borderColor": [
        "rgba(67, 66, 93, 1)",
      ],
      "hoverBackgroundColor": ["rgba(88, 42, 42, 1)"],
      "hoverBorderColor": ["rgba(88, 42, 42, 1)"],
      "borderWidth": 1
    }, {
      "label": "Tomcat Linux",
      "data": [
        130
      ],
      "fill": true,
      "backgroundColor": [
        "rgba(217, 67, 78, 1)",
      ],
      "borderColor": [
        "rgba(217, 67, 78, 1)",
      ],
      "hoverBackgroundColor": ["rgba(217, 67, 78, 1)"],
      "hoverBorderColor": ["rgba(217, 67, 78, 1)"],
      "borderWidth": 1
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

}

