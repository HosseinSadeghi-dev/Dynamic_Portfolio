import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from "@angular/material/chips";
import {SeoService} from "../../../../../core/services/seo.service";
import {NotificationService} from "../../../../../core/services/notification.service";
import {SEOModel} from "../../../../../core/models/global.model";


@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA];
  SEOs: SEOModel[] = [
    {
      url: '/',
      faName: 'لندینگ'
    },
    {
      url: '/blogs',
      faName: 'بلاگ ها',
    },
    {
      url: '/projects',
      faName: 'پروژه ها',
    },
    {
      url: '/contact',
      faName: 'ارتباط با من',
    },
  ] as SEOModel[]


  constructor(
    private seoService: SeoService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getSEOs();
  }

  addKeyword(event: MatChipInputEvent, url: string): void {
    const value = (event.value || '').trim();
    const seo = this.SEOs.find(f => f.url == url)
    if (value && seo) {
      if (seo.keywords) {
        seo.keywords += `,${value}`;
      } else {
        seo.keywords = value;
      }
    }
    event.input.value = '';
  }

  removeKeyword(keyword: string, url: string, index: number): void {
    const seo = this.SEOs.find(f => f.url == url) as SEOModel;
    if (index == 0) {
      if (seo.keywords?.split(',').length == 1) {
        seo.keywords = null
        return;
      }
      seo.keywords = seo.keywords?.replace(`${keyword},`, '')
      return
    }
    seo.keywords = seo.keywords?.replace(`,${keyword}`, '')
  }

  getSEOs(): void {
    this.seoService.getSeo().subscribe(res => {
      this.SEOs = this.SEOs.map((seo) => {
        const _seo: SEOModel = <SEOModel>res.find(f => f.url == seo.url)
        if (_seo) {
          _seo.url = seo.url
          _seo.faName = seo.faName
          return _seo;
        } else {
          return seo
        }
      })
    })
  }

  setSEO(seo: SEOModel): void {
    this.seoService.setSeo(seo).subscribe(() => {
      this.notificationService.notification('valid', 'با موفقیت ثبت شد')
      this.getSEOs();
    })
  }

}
