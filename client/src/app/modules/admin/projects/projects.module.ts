import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import {AddProjectComponent} from "./add-project/add-project.component";
import { ChangeProjectStatusComponent } from './components/change-project-status/change-project-status.component';
import {SharedModule} from "../../../shared/shared.module";
import {UploadImageModule} from "../../../shared/upload-image/upload-image.module";


@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectComponent,
    ChangeProjectStatusComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    UploadImageModule
  ]
})
export class ProjectsModule { }
