import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LandingRoutingModule} from './landing-routing.module';
import {LandingComponent} from './landing.component';
import {SharedModule} from "../../shared/shared.module";
import {ContactModule} from "../contact/contact.module";
import {BlogsModule} from "../blogs/blogs.module";
import {ProjectsModule} from "../projects/projects.module";
import {AboutModule} from "../about/about.module";


@NgModule({
  declarations: [
    LandingComponent
  ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule,
        ContactModule,
        BlogsModule,
        ProjectsModule,
        AboutModule
    ]
})
export class LandingModule {
}
