import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {_document} from "./app/shared/global/global-variable";

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
};


if (_document.readyState === 'complete') {
  bootstrap();
} else {
  _document.addEventListener('DOMContentLoaded', bootstrap);
}

