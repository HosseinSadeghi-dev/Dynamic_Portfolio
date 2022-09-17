import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {LayoutComponent} from "./modules/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./modules/blogs/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'undefined',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
