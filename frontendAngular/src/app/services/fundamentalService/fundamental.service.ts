import { inject, Injectable, signal } from '@angular/core';
import { CoreService } from '../core.service';
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
import { YearMetrics, FundamentalMetrics, FundamentalMetricsResponse } from '../../models/fundamental.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationService } from '../notificationService/notification.service'

@Injectable({
  providedIn: 'root',
})
export class FundamentalService extends CoreService {
  // Using Angular Signals for state
  private notificationService = inject(NotificationService);
  private _fundamentalDataRaw = signal<FundamentalMetricsResponse | null>(null);
  private _fundamentalData = signal<FundamentalMetrics | null>(null);
  private _ticker = signal<string>('603989')
  public isYear = signal(true);
  // ('GNFT.PA');
  public fundamentalData = this._fundamentalData.asReadonly();
  serviceName = 'fundamental';
  public tickerInput = this._ticker.asReadonly()


  getFundamentalData(ticker: string) {
    return this.apiCall(
      this.http
        .get<FundamentalMetricsResponse>(
          `${this.apiUrl}/${this.serviceName}/${ticker}`
        )
        .pipe(
          tap((result) => {
            const { companyName, metrics_cat_year } = result

            this._fundamentalData.set({ ticker, companyName, metrics_cat: metrics_cat_year });
            this._ticker.set(ticker)
          })
        )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this._fundamentalData.set(null);
        this._ticker.set('');
        this.notificationService.showError(this.getErrorMessage(error, ticker))

        // Different handling based on error type
        return throwError(() => error);
      })
    );
  }

  public updateTicker(ticker: string) {
    this._ticker.set(ticker)
  }

  public getFundamentalDataCn(ticker: string) {
    return this.apiCall(
      this.http
        .get<FundamentalMetricsResponse>(
          `${this.apiUrl}/${this.serviceName}/chinese/${ticker}`
        )
        .pipe(
          map((result) => {

            this._ticker.set(ticker)

            const { companyName, metrics_cat_year, metrics_cat_season } = result
            if (!metrics_cat_season && !metrics_cat_year) {
              this._fundamentalData.set(null)
              throw new HttpErrorResponse({ 'status': 405 })
            }
            this._fundamentalDataRaw.set(result)
            if (this.isYear()) {
              this._fundamentalData.set({ ticker, companyName, metrics_cat: metrics_cat_year })
            } else {
              this._fundamentalData.set({ ticker, companyName, metrics_cat: metrics_cat_season })
            }
          })
        )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this._ticker.set('');
        this.notificationService.showError(this.getErrorMessage(error, ticker))

        // Different handling based on error type
        return throwError(() => error);
      })
    );
  }

  private getErrorMessage(err: HttpErrorResponse, ticker: string): string {
    return {
      404: `Ticker "${ticker}" not found`,
      405: `${ticker}'s CSV does not existed`,
      500: 'Server unavailable - try again later',
      0: 'Network connection failed'
    }[err.status] || `Failed to load data for ${ticker}`
  }

  public updatePeriod(period: string) {
    if (period == 'year') {
      if (!this.isYear()) {
        if (this._fundamentalDataRaw()) {
          const { ticker, companyName, metrics_cat_year, } = this._fundamentalDataRaw() as FundamentalMetricsResponse
          this._fundamentalData.set({ ticker, companyName, metrics_cat: metrics_cat_year })
        }
        this.isYear.set(true)

      }
    } else if (period == 'season') {
      if (this.isYear()) {
        if (this._fundamentalDataRaw()) {
          const { ticker, companyName, metrics_cat_season } = this._fundamentalDataRaw() as FundamentalMetricsResponse
          this._fundamentalData.set({ ticker, companyName, metrics_cat: metrics_cat_season })
        }
        this.isYear.set(false)

      }
    }
  }
}
