import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  handleError(error: Error): void {
    this.zone.run(() => {
      this.snackbar.open(error.message, 'Close', {
        duration: 3000,
      });
    });
  }
}
