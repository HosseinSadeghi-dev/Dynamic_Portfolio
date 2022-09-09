import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {LayoutComponent} from "./modules/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: []
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
