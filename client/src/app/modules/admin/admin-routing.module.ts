import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'info',
        loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./contact-me/contact-me.module').then(m => m.ContactMeModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
