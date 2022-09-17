import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmComponent} from "../../../shared/confirm/confirm.component";
import {PaginationHandleModel} from "../../../core/models/pagination.model";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatTableDataSource} from "@angular/material/table";
import {BlogsService} from "../../../core/services/blogs.service";
import {BlogModel, BlogStatus} from "../../../core/models/blog.model";
import {MatPaginator} from "@angular/material/paginator";
import {PageEvent} from "@angular/material/paginator/paginator";
import {ChangeBlogStatusComponent} from "./components/change-blog-status/change-blog-status.component";
import {Sort, SortDirection} from "@angular/material/sort";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: MatTableDataSource<BlogModel> = new MatTableDataSource<BlogModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['image', 'title', 'seen', 'status', 'created', 'action'];
  search: string = '';

  paginatorConfig: PaginationHandleModel = {
    pageSize: 5,
    pageNumber: 0,
    total: 0
  }

  constructor(
    private blogsService: BlogsService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private matBottomSheet: MatBottomSheet,
  ) {
  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(sort?: string, sortType?: SortDirection): void {
    this.blogsService.getBlogsAdmin(
      this.paginatorConfig.pageSize,
      this.paginatorConfig.pageNumber,
      this.search,
      sort,
      sortType
    ).subscribe(products => {
      this.blogs = new MatTableDataSource<BlogModel>(products.results)
      this.paginatorConfig.total = products?.total
    })
  }

  getBlogStatus(status: BlogStatus): string {
    switch (status) {
      case BlogStatus.unPublished:
        return 'منتشر نشده'
      case BlogStatus.published:
        return 'منتشر شده'
    }
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageNumber = event.pageIndex;
    this.getBlogs()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  searchBlogs(searchWord: string): void {
    setTimeout(() => {
      this.search = searchWord
      this.paginatorConfig.pageNumber = 0;
      this.paginator.firstPage();
      this.getBlogs()
    }, 500)
  }

  deleteBlog(blogID: number): void {
    this.matDialog.open(ConfirmComponent, {
      width: '250px'
    }).afterClosed().subscribe(confirm => {
      if (confirm == true) {
        this.blogsService.deleteBlog(blogID).subscribe(() => {
          this.notificationService.notification('valid', 'با موفقیت حذف شد')
          this.getBlogs()
        })
      }
    })
  }

  editStatus(blog: BlogModel) {
    this.matBottomSheet.open(ChangeBlogStatusComponent, {
      data: blog.id,
      hasBackdrop: true,
      direction: 'rtl'
    }).afterDismissed().subscribe(
      res => {
        if (res == 0 || res == 1) {
          blog.status = res
        }
      })
  }

  sortData(sort: Sort): void {
    this.paginatorConfig.pageNumber = 0;
    this.paginator.firstPage();
    if (sort.direction !== "") {
      this.getBlogs(sort.active, sort.direction)
    } else {
      this.getBlogs()
    }
  }

}
