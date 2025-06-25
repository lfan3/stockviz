import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-example-char',
  imports: [NgApexchartsModule],
  templateUrl: './example-char.component.html',
  styles: ``,
  standalone: true
})
export class ExampleCharComponent implements OnInit, OnChanges {
  // @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}

  @Input() series!: ApexAxisChartSeries | any;
  @Input() dataLabels!: ApexDataLabels | any;
  @Input() plotOptions!: ApexPlotOptions | any;
  @Input() yaxis!: ApexYAxis | any;
  @Input() legend!: ApexLegend | any;
  @Input() fill!: ApexFill | any;
  @Input() stroke!: ApexStroke | any;
  @Input() tooltip!: ApexTooltip | any;
  @Input() xaxis!: ApexXAxis | undefined;
  @Input() chart!: ApexChart | any;

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        animations: {
          enabled: false // Disable if you see performance issues
        }
      },
      // plotOptions: {
      //   bar: {
      //     horizontal: false,
      //     columnWidth: "55%",
      //     // endingShape: "rounded"
      //   }
      // },
      // dataLabels: {
      //   enabled: false
      // },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      // fill: {
      //   opacity: 1
      // },
      // tooltip: {
      //   y: {
      //     formatter: function (val) {
      //       return "$ " + val + " thousands";
      //     }
      //   }
      // }
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("change", changes)
  }

}
