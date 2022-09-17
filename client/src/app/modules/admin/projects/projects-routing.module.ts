import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsComponent} from "./projects.component";
import {AddProjectComponent} from "./add-project/add-project.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'new',
    component: AddProjectComponent
  },
  {
    path: 'edit/:id',
    component: AddProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
