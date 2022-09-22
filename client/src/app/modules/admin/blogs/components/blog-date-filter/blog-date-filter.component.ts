import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BlogsService} from "../../../../../core/services/blogs.service";

@Component({
  selector: 'app-blog-date-filter',
  templateUrl: './blog-date-filter.component.html',
  styleUrls: ['./blog-date-filter.component.scss']
})
export class BlogDateFilterComponent implements OnInit {

  seen: number | null = null

  constructor(
    @Inject(MAT_DIALOG_DATA) private blogID: number,
    public dialogRef: MatDialogRef<BlogDateFilterComponent>,
    private blogService: BlogsService
  ) { }

  ngOnInit(): void {
  }

  submit(startDate: string, endDate: string): void {
    this.blogService.getBlogSeenStatus(this.blogID, new Date(startDate), new Date(endDate)).subscribe(seen => {
      this.seen = seen
    })
  }

}
