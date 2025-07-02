import { Component, computed, effect, inject } from '@angular/core';
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
  imports: [StickerInputComponent, GeneralBarComponent],
  standalone: true,
  templateUrl: './fundamental-charts.component.html',
  styles: ``,
})
export class FundamentalChartsComponent {
  fundamentalSerivice = inject(FundamentalService);
  isLoading = computed(() => this.fundamentalSerivice.isLoading());
  metricsValue = computed(() => this.fundamentalSerivice.fundamentalData());
  metricsCategory = computed(() => this.metricsValue()?.metrics_cat || { time: [] });
  metricsCategoryObjEntry = computed(
    () => Object.entries(this.metricsCategory()) as [string, number[]][]
  );
  years = computed(() => this.metricsCategory()?.time)
  ticker = computed(() => this.fundamentalSerivice.tickerInput() || 'Default');
  chinese = computed(() => this.fundamentalSerivice.chinisestest())

  constructor() {
    console.log('metr', this.metricsValue());
    effect(() => {
      console.log('Metrics data:', this.metricsValue());
      console.log('Metrics category:', this.metricsCategory());
      console.log('Entries:', this.metricsCategoryObjEntry());
      console.log("chiese", this.chinese())
    });
  }
}
