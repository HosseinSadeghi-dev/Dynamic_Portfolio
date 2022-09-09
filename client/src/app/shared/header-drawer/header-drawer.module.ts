import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderDrawerComponent} from './header-drawer.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    HeaderDrawerComponent
  ],
  exports: [
    HeaderDrawerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class HeaderDrawerModule {
}
