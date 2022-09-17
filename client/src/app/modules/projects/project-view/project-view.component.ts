import { Component, OnInit } from '@angular/core';
import {BlogModel} from "../../../core/models/blog.model";
import {ActivatedRoute} from "@angular/router";
import {ProjectModel} from "../../../core/models/project.model";
import {_window} from "../../../shared/global/global-variable";
import {SeoService} from "../../../core/services/seo.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  project!: ProjectModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) { }

  ngOnInit(): void {
    this.getBlogByRouteData()
  }

  getBlogByRouteData(): void {
    this.activatedRoute.data.subscribe(data => {
      this.project = data['project']
      this.setSeoData()
    })
  }

  setSeoData(): void {
    this.seoService.seoInit({
      url: _window.location.pathname,
      title: this.project.title,
      keywords: this.project.keywords,
      description: this.project.description,
      "og:image": _window.location.origin + '/' + this.project.image,
      "og:type": 'article',
      "og:locale": 'fa_IR',
      "og:site_name": 'Portfolio',
      "og:url": _window.location.pathname,
      "og:description": this.project.description,
      "twitter:description": this.project.description,
      "twitter:url": _window.location.pathname,
      "twitter:title": this.project.title
    })
  }
}
