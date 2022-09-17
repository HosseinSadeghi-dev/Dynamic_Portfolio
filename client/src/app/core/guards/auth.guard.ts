import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
  }

  // @ts-ignore
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    if (await this.authService.checkToken().toPromise()) {
      return true;
    }
    this.notificationService.notification('error', 'عدم دسترسی')
    return false;
  }

}
