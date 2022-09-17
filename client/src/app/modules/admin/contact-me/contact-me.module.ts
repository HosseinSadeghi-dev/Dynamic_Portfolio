import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactMeRoutingModule} from './contact-me-routing.module';
import {ContactMeComponent} from './contact-me.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    ContactMeComponent
  ],
  imports: [
    CommonModule,
    ContactMeRoutingModule,
    SharedModule
  ]
})
export class ContactMeModule {
}
