import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private snackBar = inject(MatSnackBar)

  showError(message: string, config?: {
    duration?: number;
    action?: string;
  }) {
    this.snackBar.open(
      message,
      config?.action || '',
      {
        duration: config?.duration ?? 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['border', 'border-3', 'bg-white', 'border-solid', 'borderf-red-500', 'text-red-500']
      }
    )
  }
}
