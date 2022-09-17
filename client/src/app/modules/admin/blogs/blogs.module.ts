import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import {SharedModule} from "../../../shared/shared.module";
import { ChangeBlogStatusComponent } from './components/change-blog-status/change-blog-status.component';
import {UploadImageModule} from "../../../shared/upload-image/upload-image.module";


@NgModule({
  declarations: [
    BlogsComponent,
    AddBlogComponent,
    ChangeBlogStatusComponent
  ],
    imports: [
        CommonModule,
        BlogsRoutingModule,
        SharedModule,
        UploadImageModule
    ]
})
export class BlogsModule { }
