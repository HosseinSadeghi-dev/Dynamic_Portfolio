import {Component, Input, OnInit} from '@angular/core';
import {PaginationHandleModel, PaginationModel} from "../../core/models/pagination.model";
import {BlogModel} from "../../core/models/blog.model";
import {ActivatedRoute} from "@angular/router";
import {BlogsService} from "../../core/services/blogs.service";
import {PageEvent} from "@angular/material/paginator/paginator";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  @Input() fromLanding: boolean = false
  blogs!: PaginationModel<BlogModel>;
  pagination: PaginationHandleModel = {
    pageSize: 6,
    pageNumber: 0,
  }
  colors: string[] = ['#E4EE89', '#FD2155', '#81D8F7']

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogsService: BlogsService
  ) {
  }

  ngOnInit(): void {
    this.getBlogsByRouteData()
  }

  getBlogsByRouteData(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data && data['blogs']) {
        this.blogs = data['blogs']
        this.pagination.pageSize = this.blogs.page_total
        this.setBlogsColor(this.blogs?.results)
      } else {
        this.getBlogs()
      }
    })
  }

  getBlogs(): void {
    this.blogsService.getBlogs(
      this.pagination.pageSize,
      this.pagination.pageNumber
    ).subscribe(blogs => {
      this.blogs = blogs
      this.setBlogsColor(this.blogs?.results)
    })
  }

  setBlogsColor(blogs: BlogModel[]): void {
    for (let i = 0; i < blogs.length; i += 3) {
      const color = this.getRandomColor()
      let counter = 3;
      while (counter >= 1) {
        if (blogs[i+counter - 1]) {
          blogs[i+counter - 1].showColor = color
        }
        counter--;
      }
    }
  }

  handlePagination(page: PageEvent): void {
    this.pagination.pageSize = page.pageSize;
    this.pagination.pageNumber = page.pageIndex;
    this.getBlogs()
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

}
