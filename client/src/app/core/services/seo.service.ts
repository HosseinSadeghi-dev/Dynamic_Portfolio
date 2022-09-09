import {Inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {SEOModel} from "../models/global.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {
  }


  setSEO(data: SEOModel) {
    const url = environment.apiUrl + data['url']
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
        if (key.includes('og')) {
          this.metaService.removeTag(`property='${key}'`);
        }
        else {
          this.metaService.removeTag(`name='${key}'`);
        }
        return
      }
      if (key.includes('og')) {
        if (key.includes('url')) {
          this.metaService.updateTag({property: key, content: url}, `property='${key}'`)
        } else {
          this.metaService.updateTag({property: key, content: value}, `property='${key}'`)
        }
      } else if (key == 'title') {
        this.titleService.setTitle(value)
      } else {
        if (key.includes('url')) {
          this.metaService.updateTag({name: key, content: url}, `name='${key}'`)
        } else {
          this.metaService.updateTag({name: key, content: value}, `name='${key}'`)
        }
      }
    });
    if (!data['keywords']) {
      this.metaService.removeTag("name='keywords'");
    }
    this.setLinkAttribute('canonical', url)
  }

  setLinkAttribute(value: string, url: string) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical !== null) {
      canonical.setAttribute('href', url);
    } else {
      let link: HTMLLinkElement = this.doc.createElement('link');
      link.setAttribute('rel', value);
      this.doc.head.appendChild(link);
      link.setAttribute('href', url);
    }
  }
}
