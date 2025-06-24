import { Component, computed, effect, inject } from '@angular/core';
import {
  YearMetrics,
  FundamentalMetrics,
  MetricsCategory,
} from '../../models/fundamental.model';
import { FundamentalService } from '../../services/fundamental.service';
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
  metricsCategory = computed(() => this.metricsValue()?.metrics_cat || {});
  metricsCategoryObjEntry = computed(
    () => Object.entries(this.metricsCategory()) as [string, number[]][]
  );
  ticker = computed(() => this.fundamentalSerivice.tickerInput() || 'Default');

  constructor() {
    console.log('metr', this.metricsValue());
    effect(() => {
      console.log('Metrics data:', this.metricsValue());
      console.log('Metrics category:', this.metricsCategory());
      console.log('Entries:', this.metricsCategoryObjEntry());
    });
  }
}
