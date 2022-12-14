import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import {SharedModule} from "../../../shared/shared.module";
// import {PdfViewerModule} from "ng2-pdf-viewer";
import { AddSkillDialogComponent } from './components/add-skill-dialog/add-skill-dialog.component';
import {SeoComponent} from "./components/seo/seo.component";
import { SocialMediaComponent } from './components/social-media/social-media.component';


@NgModule({
  declarations: [
    InfoComponent,
    AddSkillDialogComponent,
    SeoComponent,
    SocialMediaComponent
  ],
    imports: [
        CommonModule,
        InfoRoutingModule,
        SharedModule,
        // PdfViewerModule
    ]
})
export class InfoModule { }
