import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {SEOModel} from "./core/models/global.model";
import {CredentialsService} from "./core/services/credentials.service";
import {SwUpdate} from "@angular/service-worker";
import {Meta} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {SeoService} from "./core/services/seo.service";
import {DOCUMENT} from "@angular/common";
import {_window} from "./shared/global/global-variable";
import {SettingService} from "./core/services/setting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'dynamic-portfolio';
  SEOs: SEOModel[] = [];

  constructor(
    public credentialsService: CredentialsService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private meta: Meta,
    private update: SwUpdate,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    public settingService: SettingService
  ) {
  }

  ngOnInit(): void {
    this.settingService.initSetting()
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  checkPWAManifest(): void {
    const faviconEl: any = document.getElementById('favicon');

    let myDynamicManifest = {
      // "name": this.storeSettingService.store.name,
      // "short_name": this.storeSettingService.store.name,
      // "description": this.storeSettingService.store.motto,
      "display": "standalone",
      "orientation": "portrait",
      "scope": _window.location.origin,
      "start_url": _window.location.origin,
      "developer": {
        "name": "Hossein Sadeghi",
        "url": "https://www.linkedin.com/in/hossein-sadeghi-077092209/"
      },
      "background_color": "#fafafa",
      "theme_color": this.document.documentElement.style
        .getPropertyValue('--custom-primary-color'),
      "icons": [
        {
          "src": `${faviconEl.href}`,
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
      ]
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      const manifest: any = reader.result
      document.querySelector('#PWAManifest')?.setAttribute('href', manifest);
    };
  }

}
