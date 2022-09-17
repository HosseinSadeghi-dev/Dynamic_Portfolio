import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactMeComponent} from "./contact-me.component";

const routes: Routes = [{
  path: '',
  component: ContactMeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactMeRoutingModule { }
