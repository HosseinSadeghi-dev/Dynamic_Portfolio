import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from './projects.component';
import {SharedModule} from "../../shared/shared.module";
import {ProjectViewComponent} from './project-view/project-view.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule {
}
