import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadImageComponent} from './upload-image.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UploadImageComponent
  ]
})
export class UploadImageModule {
}
