import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'tf-per-cost-center-chart',
  templateUrl: './per-cost-center-pie.component.html',
  styleUrls: ['./per-cost-center-pie.component.scss']
})
export class PerCostCenterPieComponent implements OnInit {
  doughnutChartLabels: Label[] = [
    'Inversari',
    'Skipper',
    'Akreditasi',
    'Parser',
    'Resiko',
    'Dewa',
    'Broker',
    'Infra',
    'Marketing'
  ];
  doughnutChartData: MultiDataSet = [[55, 25, 20, 55, 25, 20, 55, 25, 20]];
  doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}
}
