import { Component, OnInit } from '@angular/core';
import {BlogsService} from "../../../../core/services/blogs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogModel, BlogStatus} from "../../../../core/models/blog.model";
import {NotificationService} from "../../../../core/services/notification.service";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  blog = {} as BlogModel;
  imageToUpload: File | null = null;
  blogStatuses: {
    name: string,
    status: BlogStatus
  }[] = [
    {
      name: 'منتشر شده',
      status: BlogStatus.published
    },
    {
      name: 'منتشر نشده',
      status: BlogStatus.unPublished
    },
  ];

  constructor(
    private blogsService: BlogsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.blogsService.getOneBlogAdmin(params['id']).subscribe(blog => {
          this.blog = blog
        })
      }
    })
  }

  imageDeleted(): void {
    if (this.blog.id && this.blog.image) {
      this.blog.imageDeleted = true
      this.blog.image = ''
    }
    this.imageToUpload = null
  }

  submit(): void {
    if (this.blog.id) {
      this.blogsService.editBlog(this.blog, this.imageToUpload).subscribe(() => {
        this.notificationService.notification('valid', 'با موفقیت ویرایش شد')
        this.router.navigate(['/admin/blogs'])
      })
    } else {
      this.blogsService.createBlog(this.blog, this.imageToUpload).subscribe(() => {
        this.notificationService.notification('valid', 'با موفقیت ایجاد شد')
        this.router.navigate(['/admin/blogs'])
      })
    }
  }

}
