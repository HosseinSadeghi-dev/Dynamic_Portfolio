import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from './contact.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
  ],
  exports: [
    ContactComponent
  ]
})
export class ContactModule {
}
