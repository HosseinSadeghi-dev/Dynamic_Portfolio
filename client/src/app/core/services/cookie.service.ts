import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }

  setCookie(name: any, value: any, expireDay = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDay * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }

  deleteCookie(cname?: string) {
    if (cname) {
      document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return
    }

    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

}
