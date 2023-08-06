import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  // Handling global retry logic for all HTTP calls...

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(retry({ count: 3, delay: 1000 }));
  }
}
