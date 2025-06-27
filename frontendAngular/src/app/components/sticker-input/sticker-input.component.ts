import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../core/components/input/input.component';
import { PrimaryButtonComponent } from '../../core/components/primary-button/primary-button.component';
import {
  YearMetrics,
  FundamentalMetrics,
} from '../../models/fundamental.model';
import { FundamentalService } from '../../services/fundamentalService/fundamental.service';

@Component({
  selector: 'app-sticker-input',
  imports: [InputComponent, PrimaryButtonComponent],
  standalone: true,
  templateUrl: './sticker-input.component.html',
  styles: ``,
})
export class StickerInputComponent {
  protected service = inject(FundamentalService);
  ticketValue = signal<string>('GNFT.PA');


  onSubmitFundamental() {
    this.service.getFundamentalData(this.ticketValue()).subscribe();
  }

  onTickerValueChanged(value: string) {
    // this.service.updateTickerInput(value);
    this.ticketValue.set(value)
  }
}
