import { afterNextRender, Component, computed, inject, input, OnChanges, OnInit, Signal, SimpleChanges, viewChild } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexGrid,
  ApexLegend,
  ChartComponent
} from 'ng-apexcharts';
import { FundamentalService } from '../../services/fundamental.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  grid: ApexGrid;
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
  apexChart = viewChild.required<ChartComponent>('chart');
  ticker = input<string>('company');
  financialCategory = input<string>('roe');
  seriesData = input<number[]>([0.23453453, 0.45539049, 1.24893434]);
  xCat = input<string[] | number[]>([
    2020, 2021, 2022,
  ]);
  title = computed(() => {
    return `${this.ticker()} - ${this.financialCategory().toUpperCase()}`;
  });

  chart = input<ApexChart>({
    height: 350,
    width: 400,
    type: 'bar',
  });


  chartOptions: Signal<ChartOptions> = computed(() => {
    return {
      series: [
        {
          name: this.financialCategory(),
          data: this.seriesData().map(num => parseFloat(num.toFixed(2))),
        },
      ],
      chart: this.chart(),
      title: {
        text: this.title(),
      },
      grid: {
        borderColor: '#e324a7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
        }
      },
      xaxis: {
        categories: this.xCat(),
        axisBorder: {
          show: true,
          color: '#e324a7',
          strokeWidth: 100
        },
        axisTicks: {
          show: true,
          color: '#e324a7',
        }
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
          style: {
            fontSize: '12px',
            fontWeight: 'bold'
          }
        },
        axisBorder: {
          show: true,
          color: '#e324a7',
          strokeWidth: 100
        },
      },
      dataLabels: {
        textAnchor: 'middle',
        style: {
          fontSize: '12px',
          colors: ['white']
        }
      }
    }
  })

  constructor() {
    afterNextRender(() => {
      console.log("cahrt ref:", this.apexChart())
      console.log("cahrt ref:", this.apexChart()?.chart())
      console.log("cahrt ref:", this.apexChart()?.chartInstance())
      console.log("cahrt ref:", this.apexChart()?.dataLabels())
    })

  }




}
