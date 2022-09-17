import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {LayoutComponent} from "./modules/layout/layout.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderDrawerModule} from "./shared/header-drawer/header-drawer.module";
import {NetworkConnectionModule} from "./shared/network-connection/network-connection.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent
  ],
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule,
    HeaderDrawerModule,
    NetworkConnectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
