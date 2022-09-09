import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Logger} from "./logger.service";
import {environment} from "../../../environments/environment";
import {AppService} from "../services/app.service";

const log = new Logger("ErrorHandlerInterceptor");

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private appService: AppService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.appService.loading = false;
          }
        }),
        catchError(error => this.errorHandler(error)));
  }

  private errorHandler(response: any): Observable<HttpEvent<any>> {
    this.appService.loading = false;
    if (!environment.production) {
      log.error("Request error", response);
    }
    throw response;
  }
}

