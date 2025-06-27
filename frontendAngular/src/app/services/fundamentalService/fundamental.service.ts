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
import { YearMetrics, FundamentalMetrics } from '../../models/fundamental.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationService } from '../notificationService/notification.service'

@Injectable({
  providedIn: 'root',
})
export class FundamentalService extends CoreService {
  // Using Angular Signals for state
  private notificationService = inject(NotificationService);
  private _fundamentalData = signal<FundamentalMetrics | null>(null);
  private _ticker = signal<string>('ALHPI.PA')
  // ('GNFT.PA');
  public fundamentalData = this._fundamentalData.asReadonly();
  serviceName = 'fundamental';
  public tickerInput = this._ticker.asReadonly()


  getFundamentalData(ticker: string): Observable<FundamentalMetrics> {
    return this.apiCall(
      this.http
        .get<FundamentalMetrics>(
          `${this.apiUrl}/${this.serviceName}/${ticker}`
        )
        .pipe(
          tap((result) => {
            console.log('result', result);
            this._fundamentalData.set(result);
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

  private getErrorMessage(err: HttpErrorResponse, ticker: string): string {
    return {
      404: `Ticker "${ticker}" not found`,
      500: 'Server unavailable - try again later',
      0: 'Network connection failed'
    }[err.status] || `Failed to load data for ${ticker}`
  }
}
