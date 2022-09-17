import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkConnectionComponent} from './network-connection.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    NetworkConnectionComponent
  ],
  exports: [
    NetworkConnectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NetworkConnectionModule {
}
