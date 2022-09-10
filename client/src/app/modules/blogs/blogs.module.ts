import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    BlogsComponent,
    BlogViewComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule
  ],
  exports: [
    BlogsComponent,
  ]
})
export class BlogsModule { }
