import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';

@Injectable()
export class CoreService {
  protected http = inject(HttpClient);
  protected apiUrl = 'http://localhost:8000/api'; // Adjust the URL as needed

  protected loading = signal<boolean>(false);
  protected error = signal<string | null>(null);

  public isLoading = this.loading.asReadonly();
  public errorMessage = this.error.asReadonly();

  constructor() { }

  protected apiCall<T>(request: Observable<T>): Observable<T> {
    this.loading.set(true);
    this.error.set(null);

    return request.pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  protected handleError(error: HttpErrorResponse) {
    // Handle the error appropriately
    this.error.set(error.message || 'Unknown error');

    return throwError(
      () => error
    );
  }
}
