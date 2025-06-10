import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

// Configuración del locale de la app
import localeEsHN from "@angular/common/locales/es-HN";
import localeFrCa from "@angular/common/locales/fr-CA";


import { registerLocaleData } from "@angular/common";

registerLocaleData( localeEsHN )
registerLocaleData( localeFrCa )


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,useValue: 'es-HN'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
