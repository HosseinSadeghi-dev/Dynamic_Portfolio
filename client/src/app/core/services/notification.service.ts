import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  notification(type: 'valid' | 'error' | 'warning', message: string, action?: string, duration?: number) {
    this.snackBar.open(
      message,
      action || undefined,
      {
        duration: duration || 2500,
        direction: 'rtl',
        horizontalPosition: 'right',
        panelClass: `${type}SnackBar`
      }
    )
  }

}
