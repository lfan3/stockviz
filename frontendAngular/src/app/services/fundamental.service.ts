import { Injectable, signal } from '@angular/core';
import { CoreService } from './core.service';
import {
  Observable,
  catchError,
  debounce,
  debounceTime,
  map,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { YearMetrics, FundamentalMetrics } from '../models/fundamental.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FundamentalService extends CoreService {
  // Using Angular Signals for state
  private _fundamentalData = signal<FundamentalMetrics | null>(null);
  public fundamentalData = this._fundamentalData.asReadonly();
  serviceName = 'fundamental';
  public tickerInput = signal<string>('GNFT.PA');

  updateTickerInput(tickerValue: string) {
    this.tickerInput.set(tickerValue);
  }

  getFundamentalData(): Observable<FundamentalMetrics> {
    return this.apiCall(
      this.http
        .get<FundamentalMetrics>(
          `${this.apiUrl}/${this.serviceName}/${this.tickerInput()}`
        )
        .pipe(
          tap((result) => {
            console.log('result', result);
            this._fundamentalData.set(result);
            this.loading.set(false);
          })
        )
    );
  }
}
