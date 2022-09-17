import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {SharedModule} from "../../shared/shared.module";
// import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    // PdfViewerModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
