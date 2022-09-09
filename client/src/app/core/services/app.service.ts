import {Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {_window} from "../../shared/global/global-variable";
import {DOCUMENT} from "@angular/common";
import {SidenavStatus} from "../models/global.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _loading: Subject<boolean> = new Subject<boolean>();
  private _headerSidenavStatus: Subject<SidenavStatus> = new Subject<SidenavStatus>();
  private _theme: 'dark' | 'light' = 'dark';
  windowWidth: number = _window.innerWidth

  constructor(
  ) {}

  // services

  set loading(loading: boolean | any) {
    this._loading.next(loading)
  }

  get loading(): Subject<boolean> {
    return this._loading
  }

  set theme(theme: 'dark' | 'light') {
    this._theme = theme
  }

  get theme(): 'dark' | 'light' {
    return this._theme
  }

  set headerSidenav(status: SidenavStatus | any) {
    this._headerSidenavStatus.next(status)
  }

  get headerSidenav(): Subject<SidenavStatus> {
    return this._headerSidenavStatus
  }

  refresh = () => _window.location.reload()

}
