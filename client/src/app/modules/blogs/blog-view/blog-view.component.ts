import { Component, OnInit } from '@angular/core';
import {BlogModel} from "../../../core/models/blog.model";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../../core/services/seo.service";
import {_window} from "../../../shared/global/global-variable";

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  blog!: BlogModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.getBlogByRouteData()
  }

  getBlogByRouteData(): void {
    this.activatedRoute.data.subscribe(data => {
      this.blog = data['blog']
      this.setSeoData()
    })
  }

  setSeoData(): void {
    this.seoService.seoInit({
      url: _window.location.pathname,
      title: this.blog.title,
      keywords: this.blog.keywords,
      description: this.blog.description,
      "og:image": _window.location.origin + '/' + this.blog.image,
      "og:type": 'article',
      "og:locale": 'fa_IR',
      "og:site_name": 'Portfolio',
      "og:url": _window.location.pathname,
      "og:description": this.blog.description,
      "twitter:description": this.blog.description,
      "twitter:url": _window.location.pathname,
      "twitter:title": this.blog.title
    })
  }

}
