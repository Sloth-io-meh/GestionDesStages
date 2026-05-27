import { Injectable, ApplicationRef } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ZoneInterceptor implements HttpInterceptor {
  constructor(private appRef: ApplicationRef) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: () => setTimeout(() => this.appRef.tick()),
        error: () => setTimeout(() => this.appRef.tick()),
      })
    );
  }
}
