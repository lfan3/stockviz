import { Component, computed, inject, signal } from '@angular/core';
import { InputComponent } from '../../core/components/input/input.component';
import { PrimaryButtonComponent } from '../../core/components/primary-button/primary-button.component';
import {
  YearMetrics,
  FundamentalMetrics,
} from '../../models/fundamental.model';
import { FundamentalService } from '../../services/fundamentalService/fundamental.service'

@Component({
  selector: 'app-sticker-input',
  imports: [InputComponent, PrimaryButtonComponent],
  standalone: true,
  templateUrl: './sticker-input.component.html',
  styles: ``,
})
export class StickerInputComponent {
  protected fundamentalSerivice = inject(FundamentalService);
  ticketValue = computed(() => this.fundamentalSerivice.tickerInput())

  onSubmitFundamental() {
    const ticker = this.ticketValue()
    if (/[a-zA-Z]/.test(ticker)) {
      this.fundamentalSerivice.getFundamentalData(this.ticketValue()).subscribe();
    } else {
      this.fundamentalSerivice.getFundamentalDataCn(ticker).subscribe()
    }
  }

  onTickerValueChanged(value: string) {
    this.fundamentalSerivice.updateTicker(value);
  }
}
