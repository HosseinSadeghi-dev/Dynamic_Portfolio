import { Component, OnInit } from '@angular/core';
import {PaginationHandleModel, PaginationModel} from "../../core/models/pagination.model";
import {BlogModel} from "../../core/models/blog.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs!: PaginationModel<BlogModel>;
  pagination: PaginationHandleModel = {
    pageSize: 6,
    pageNumber: 1
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs(): void {
    this.activatedRoute.data.subscribe(data => {
      this.blogs = data['blogs']
    })
  }

}
