import {Inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {SEOModel} from "../models/global.model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PaginationModel} from "../models/pagination.model";
import {ContactMeModel} from "../models/contact-me.model";
import {catchError, map} from "rxjs/operators";
import {_window} from "../../shared/global/global-variable";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
    private httpClient: HttpClient
  ) {
  }

  seoInit(data: SEOModel) {
    const url = _window.location.origin + data['url']
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

  // http services

  getSeo(
  ): Observable<SEOModel[]> {
    return this.httpClient.get("/seo").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setSeo(seo: SEOModel): Observable<SEOModel> {
    return this.httpClient.put("/seo", seo).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
