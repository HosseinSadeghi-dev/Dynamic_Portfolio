import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogsComponent} from "./blogs.component";
import {BlogViewComponent} from "./blog-view/blog-view.component";
import {BlogsResolver} from "./resolver/blogs.resolver";

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    resolve: {blogs: BlogsResolver}
  },
  {
    path: 'view/:id',
    component: BlogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
