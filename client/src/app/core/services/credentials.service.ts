import {Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "./app.service";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private credentialsKey = "_session";
  private _token!: string | null;
  private _credentials: any;

  constructor(
    private router: Router,
    private appService: AppService,
    private cookieService: CookieService
  ) {
    const savedToken = this.cookieService.getCookie(this.credentialsKey);
    if (savedToken) {
      this.token = savedToken;
    }
  }

  set credentials(credentials: any) {
    this._credentials = credentials
    this.token = this._credentials.TOKEN
  }

  get credentials(): any {
    return this._credentials
  }

  set token(token: string) {
    this.cookieService.setCookie(this.credentialsKey, token)
    this._token = token
  }

  get token(): string {
    return this._token as string
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  get isAdmin(): boolean {
    // return this.credentials?.ROLE_ID == UserRoles.admin
    return false
  }

  logout(): void {
    this.cookieService.deleteCookie(this.credentialsKey)
    localStorage.removeItem(this.credentialsKey);
    this._token = null;
    this._credentials = null;
    this.router.navigate(['/'])
  }

}
