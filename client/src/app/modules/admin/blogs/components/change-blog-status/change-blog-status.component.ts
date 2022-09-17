import {Component, Inject, OnInit} from '@angular/core';
import {BlogsService} from "../../../../../core/services/blogs.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {BlogStatus} from "../../../../../core/models/blog.model";

@Component({
  selector: 'app-change-blog-status',
  templateUrl: './change-blog-status.component.html',
  styleUrls: ['./change-blog-status.component.scss']
})
export class ChangeBlogStatusComponent implements OnInit {

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
    private _bottomSheetRef: MatBottomSheetRef<ChangeBlogStatusComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public blogId: number,
    private blogsService: BlogsService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(status: BlogStatus): void {
    this.blogsService.editBlogStatus(this.blogId, status).subscribe(() => {
      this._bottomSheetRef.dismiss(status);
    })
  }

}
