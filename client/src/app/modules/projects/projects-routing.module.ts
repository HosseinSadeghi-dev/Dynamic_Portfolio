import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsComponent} from "./projects.component";
import {ProjectsResolver} from "./resolver/projects.resolver";
import {ProjectViewComponent} from "./project-view/project-view.component";
import {ProjectViewResolver} from "./resolver/project-view.resolver";

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    resolve: {projects: ProjectsResolver}
  },
  {
    path: 'view/:id',
    component: ProjectViewComponent,
    resolve: {project: ProjectViewResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
