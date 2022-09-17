import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogsComponent} from "./blogs.component";
import {AddBlogComponent} from "./add-blog/add-blog.component";

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
  },
  {
    path: 'new',
    component: AddBlogComponent
  },
  {
    path: 'edit/:id',
    component: AddBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
