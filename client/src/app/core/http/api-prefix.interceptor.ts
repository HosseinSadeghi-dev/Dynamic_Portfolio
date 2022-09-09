import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from "../services/app.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private appService: AppService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url) && !request.url.includes('i18n')) {
      request = request.clone({url: environment.apiUrl + request.url});
    }
    this.appService.loading = true
    return next.handle(request);
  }
}
