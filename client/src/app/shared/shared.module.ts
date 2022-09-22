import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from '@angular/router';
import {ConfirmComponent} from './confirm/confirm.component';
import {LoadingComponent} from './loading/loading.component';
import {MaterialModule} from './material/material.module';
import {JalaliDatePipe} from './pipes/jalali-date.pipe';
import {NumberPipe} from './pipes/number.pipe';
import {SafePipe} from "src/app/shared/pipes/safe.pipe";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {JalaliMomentDateAdapter} from "./mat-core/jalali-moment-date-adapter";
import {JALALI_MOMENT_FORMATS} from "./mat-core/jalali_moment_formats";
import {CustomSwitchPipe} from './pipes/custom-switch.pipe';
import {ServerFailedComponent} from './server-failed/server-failed.component';
import {ScrollToTopComponent} from './scroll-to-top/scroll-to-top.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {NgxImageCompressService} from 'ngx-image-compress';
import {NoDecimalPipe} from "./pipes/no-decimal.pipe";
import {ImageLazyModule} from "./image-lazy/image-lazy.module";
import {CustomMatPaginatorIntl} from "./mat-core/custom_mat_paginator";

const pipes: any[] = [
  JalaliDatePipe,
  SafePipe,
  NumberPipe,
  CustomSwitchPipe,
  NoDecimalPipe
]

const directives: any[] = [
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    ImageLazyModule,
  ],
  declarations: [
    LoadingComponent,
    ConfirmComponent,
    ServerFailedComponent,
    ScrollToTopComponent,
    pipes,
    directives,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ImageLazyModule,
    LoadingComponent,
    ConfirmComponent,
    ServerFailedComponent,
    ScrollToTopComponent,
    pipes,
    directives
  ],
  providers: [
    NgxImageCompressService,
    // {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS},
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class SharedModule {
}
