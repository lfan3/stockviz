import { Component, afterNextRender, ElementRef, ViewChild, signal, input } from '@angular/core';
import { createChart, CrosshairMode, DeepPartial, LineStyle, TimeChartOptions, IChartApi, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { gnft_data } from '../../mock/gnft'

@Component({
  selector: 'app-price-chart',
  imports: [],
  templateUrl: './price-chart.component.html',
  styles: [`
    .chart-container {
      width: 100%;
      height: 600px;
      padding-left: 12px;
    }
  `],
  standalone: true,
})
export class PriceChartComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef
  chart!: IChartApi
  candleSeries: any
  volumeSeries: any

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
        background: { color: 'white' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          style: LineStyle.SparseDotted,
        }
      },
      width: this.chartContainer.nativeElement.clientWidth,
      height: 500,
      // panes: {
      //   separatorColor: '#6290ff',
      //   separatorHoverColor: '#90ff80',
      //   enableResize: false,
      // }
    }
    this.chart = createChart(this.chartContainer.nativeElement, chartOptions)
    // this.chart.priceScale('right').applyOptions({
    //   scaleMargins: {
    //     top: 0.1, // 10% margin for price chart
    //     bottom: 0.4 // 40% margin for volume (leaves space)
    //   }
    // });
    this.chart.applyOptions({
      layout: {
        panes: {
          separatorColor: '#26a69a',
          separatorHoverColor: '#00fff0',
          enableResize: false,
        },
      },
    });
    this.candleSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a', downColor: '#ef5350',
      wickUpColor: '#26a69a', wickDownColor: '#ef5350'
    });

    this.volumeSeries = this.chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      color: '#26a69a80',
    }, 1)
  }

  loadData() {
    this.candleSeries.setData(gnft_data);
    const volumeData = gnft_data.map(d => ({
      time: d.time,
      value: d.volume
    }))

    this.volumeSeries.setData(volumeData)
  }


}
