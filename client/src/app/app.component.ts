import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import {SEOModel} from "./core/models/global.model";
import {CredentialsService} from "./core/services/credentials.service";
import {SwUpdate} from "@angular/service-worker";
import {Meta} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SeoService} from "./core/services/seo.service";
import {DOCUMENT} from "@angular/common";
import {_window} from "./shared/global/global-variable";
import {SettingService} from "./core/services/setting.service";
import {SocialMediaService} from "./core/services/social-media.service";
import {PersonalService} from "./core/services/personal.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'dynamic-portfolio';
  SEOs: SEOModel[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private meta: Meta,
    private update: SwUpdate,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    public settingService: SettingService,
    private socialMediaService: SocialMediaService,
    private personalService: PersonalService
  ) {
  }

  ngOnInit(): void {
    this.settingService.initSetting();
    this.socialMediaService.initSocials();
    this.personalService.initPersonal();
    this.personalService.initSkills();
    this.setSeo();
  }

  setSeo(): void {

    this.seoService.getSeo().subscribe(res => {
      this.SEOs = res;
      const seo: SEOModel | undefined = this.SEOs.find(f => f.url == this.router.url)

      // for first time
      if (!this.router.url.includes('view') && seo) {
        this.seoService.seoInit(seo)
      }


      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(
        // @ts-ignore
        (nav: NavigationEnd) => {
          const seo: SEOModel | undefined = this.SEOs.find(f => f.url == nav.url)

          if (seo && !nav.url.includes('view')) {
            this.seoService.seoInit(seo)
          } else if (!nav.url.includes('view')) {
            this.seoService.seoInit({
              url: nav.url,
              title: this.personalService.personalDetail.fullName,
            })
          }
        })
    })
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
