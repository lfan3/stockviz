import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { FundamentalService } from '../../services/fundamental.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-general-bar',
  imports: [NgApexchartsModule],
  providers: [FundamentalService],
  standalone: true,
  templateUrl: './general-bar.component.html',
  styles: `ul {
    text-align: center;
  }`,
})
export class GeneralBarComponent {
  public chartOptions: ChartOptions;

  ticker = input<string>('');
  // data = input.required();
  // financialCategory = input.required<string>();
  financialCategory = input<string>('');
  // ticker = input('abc');
  data = input({});

  xCat = input<string[] | number[]>([
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
  ]);
  title = computed(() => {
    return `${this.ticker()} - ${this.financialCategory().toUpperCase()}`;
  });

  chart = input<ApexChart>({
    height: 350,
    width: 500,
    type: 'bar',
  });
  seriesData = input<number[]>([0]);

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: this.financialCategory(),
          data: this.seriesData(),
        },
      ],
      chart: this.chart(),
      title: {
        text: this.title(),
      },
      xaxis: {
        categories: this.xCat(),
      },
    };
  }
}
