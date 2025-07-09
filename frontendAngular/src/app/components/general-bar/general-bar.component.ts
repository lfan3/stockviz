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
import { FundamentalService } from '../../services/fundamentalService/fundamental.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
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
    return `${this.ticker()} - ${this.getTitle(this.financialCategory()).toUpperCase()}`;
  });

  constructor() {
    afterNextRender(() => {
      console.log("cahrt ref:", this.apexChart())
      console.log("cahrt ref:", this.apexChart()?.chart())
      console.log("cahrt ref:", this.apexChart()?.chartInstance())
      console.log("cahrt ref:", this.apexChart()?.dataLabels())
    })
  }

  chart = input<ApexChart>({
    height: 350,
    width: 400,
    type: 'bar',
    toolbar: {
      show: false
    }
  });


  chartOptions: Signal<ChartOptions> = computed(() => {
    return {
      series: [
        {
          name: this.financialCategory(),
          data: this.seriesData().map(num => isNaN(num) ? num : parseFloat(num.toFixed(2))),
        },
      ],
      chart: this.chart(),
      title: {
        text: this.title(),
      },

      xaxis: {
        categories: this.xCat(),
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: true,
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

  private getTitle(financialCategory: string) {
    switch (financialCategory) {
      case 'debtAssetRatio':
        return 'Debt to Asset Ratio'
      case 'currentRatio':
        return 'Current Ratio'
      case 'quickRatio':
        return 'Quick Ratio'
      case 'operatingCashFlowPerShare':
        return 'Cash flow per share'
      case 'liabilitiesAssetRatio':
        return 'Liabilities to Assets'
      case 'grossProfit':
        return 'Gross Profit'
      case 'eps':
        return 'EPS'
      default:
        return 'ROE'
    }
  }






}
