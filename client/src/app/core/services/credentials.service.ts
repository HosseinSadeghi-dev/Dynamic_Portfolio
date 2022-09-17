import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "./cookie.service";
import {AuthService} from "./auth.service";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private credentialsKey = "_session";
  private _token!: string | null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    const savedToken = this.cookieService.getCookie(this.credentialsKey);
    if (savedToken) {
      this.token = savedToken;
    }
  }

  set token(token: string) {
    this.cookieService.setCookie(this.credentialsKey, token, 30)
    this._token = token
  }

  get token(): string {
    return this._token as string
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  login(username: string, password: string): void {
    this.authService.signIn(username, password).subscribe(res => {
      this.token = res.accessToken
      this.router.navigate(['/admin']).then(() => {
        this.notificationService.notification("valid", 'خوش آمدید')
      })
    })
  }

  logout(): void {
    this.cookieService.deleteCookie(this.credentialsKey)
    this._token = null;
    this.router.navigate(['/'])
  }

}
