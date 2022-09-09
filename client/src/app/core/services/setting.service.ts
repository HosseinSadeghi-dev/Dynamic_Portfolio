import {Inject, Injectable, Injector, Renderer2, RendererFactory2} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {SettingModel} from "../models/setting.model";
import {Meta} from "@angular/platform-browser";
import {AppService} from "./app.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private renderer!: Renderer2;
  private _setting = {} as SettingModel;

  constructor(
    private httpClient: HttpClient,
    private meta: Meta,
    private appService: AppService,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initSetting(): void {
    this.getSetting().subscribe(setting => {
      this.setting = setting
    })
  }

  set setting(setting: SettingModel) {
    this._setting = setting
    this.setFont(setting.font)
    this.setTheme(setting.primaryColor, setting.accentColor)
  }

  get setting(): SettingModel {
    return this._setting
  }

  setTheme(primary: string, accent: string): string {
    this.document.documentElement.style
      .setProperty('--custom-primary-color', primary);

    this.document.documentElement.style
      .setProperty('--custom-accent-color', accent);

    this.meta.updateTag(
      {name: 'theme-color', content: primary},
      'name=theme-color'
    )

    if (this.appService.theme == 'light') {
      this.renderer.removeClass(this.document.body, 'dark-theme')
      this.renderer.addClass(this.document.body, 'light-theme')
      return 'light-theme'
    } else {
      this.renderer.removeClass(this.document.body, 'light-theme')
      this.renderer.addClass(this.document.body, 'dark-theme')
      return 'dark-theme'
    }
  }

  setFont(font: string): string {
    this.document.documentElement.style
      .setProperty('--font-family', font);
    this.renderer.addClass(this.document.body, 'custom-font')
    return 'custom-font'
  }

  // https services

  getSetting(): Observable<SettingModel> {
    return this.httpClient.get("/setting").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editSetting(setting: SettingModel): Observable<SettingModel> {
    return this.httpClient.put("setting", setting).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
