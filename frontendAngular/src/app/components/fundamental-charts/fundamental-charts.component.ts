import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';


import {
  YearMetrics,
  FundamentalMetrics,
  MetricsCategory,
} from '../../models/fundamental.model';
import { FundamentalService } from '../../services/fundamentalService/fundamental.service';
import { StickerInputComponent } from '../../components/sticker-input/sticker-input.component';
import { GeneralBarComponent } from '../../components/general-bar/general-bar.component';

@Component({
  selector: 'app-fundamental-charts',
  imports: [StickerInputComponent, GeneralBarComponent, MatSelectModule, FormsModule, MatRadioModule],
  standalone: true,
  templateUrl: './fundamental-charts.component.html',
  styles: ``,
})
export class FundamentalChartsComponent {
  fundamentalSerivice = inject(FundamentalService);
  isLoading = computed(() => this.fundamentalSerivice.isLoading());
  isYear = computed(() => this.fundamentalSerivice.isYear())
  metricsValue = computed(() => this.fundamentalSerivice.fundamentalData());
  metricsCategory = computed(() => this.metricsValue()?.metrics_cat || { time: [] });
  time = computed(() => this.metricsCategory()?.time)
  ticker = computed(() => this.fundamentalSerivice.tickerInput());
  isChineseMarket = computed(() => !(/[a-zA-Z]/).test(this.fundamentalSerivice.tickerInput()))
  metricsCategoryObjEntry = computed(
    () => {
      return Object.entries(this.metricsCategory()).filter(([k, _]) => k !== 'time').sort(([a], [b]) => this.getIndicatorWeight(a) - this.getIndicatorWeight(b)) as [string, number[]][]
    }
  );

  constructor() {
    console.log('metr', this.metricsValue());
    effect(() => {
      console.log('Metrics data:', this.metricsValue());
      console.log('Metrics category year:', this.metricsCategory());
      console.log('Entries:', this.metricsCategoryObjEntry());
    });
  }

  // controle the order of object's key, so i want to show the chart with profile indicator then cash health ind, then security indicator 
  private getIndicatorWeight(financialCategory: string) {
    switch (financialCategory) {
      case 'roe':
        return 1
      case 'eps':
        return 2
      case 'operatingCashFlowPerShare':
        return 3
      case 'grossProfit':
        return 4
      case 'currentRatio':
        return 5
      case 'liabilitiesAssetRatio':
        return 6
      case 'debtAssetRatio':
        return 7
      // 'quickRatio':
      default:
        return 8
    }
  }

  onPeriodChange = (period: string) => {
    this.fundamentalSerivice.updatePeriod(period)
    console.log(this.isYear())
  }
}
