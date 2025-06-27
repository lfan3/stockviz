import { Component, afterNextRender, ElementRef, ViewChild, signal, input } from '@angular/core';
import { createChart, CrosshairMode, DeepPartial, LineStyle, TimeChartOptions, IChartApi, CandlestickSeries } from 'lightweight-charts';
import { candlestickData } from '../../services/mockData'

@Component({
  selector: 'app-price-chart',
  imports: [],
  templateUrl: './price-chart.component.html',
  styles: [`
    .chart-container {
      width: 100%;
      height: 600px;
      margin: 12px;
    }
  `],
  standalone: true,
})
export class PriceChartComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef
  chart!: IChartApi
  candleSeries: any



  constructor() {
    afterNextRender(() => {
      this.initChart()
      this.loadData()
    })
  }

  initChart() {
    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { color: 'white' }
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          style: LineStyle.SparseDotted,
        }
      },
      width: this.chartContainer.nativeElement.clientWidth,
      height: 500,
    }
    this.chart = createChart(this.chartContainer.nativeElement, chartOptions)
    console.log("char", this.chart)
    console.log("char native", this.chartContainer.nativeElement)

    this.candleSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a', downColor: '#ef5350',
      wickUpColor: '#26a69a', wickDownColor: '#ef5350'
    });
  }

  loadData() {
    this.candleSeries.setData(candlestickData);
  }


}
