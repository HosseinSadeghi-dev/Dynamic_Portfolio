import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageLazyComponent} from './image-lazy.component';
import {LazyLoadImageModule} from "ng-lazyload-image";


@NgModule({
  declarations: [
    ImageLazyComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule
  ],
  exports: [
    ImageLazyComponent
  ]
})
export class ImageLazyModule {
}
