import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalHttpInterceptorService } from './global-http-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandlerService } from './global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      MatSnackBarModule,
      MatProgressSpinnerModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideAnimations(),
  ],
};
