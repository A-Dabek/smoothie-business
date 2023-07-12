import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SmoothieManagerContainer} from "../containers/smoothie-manager.container";
import {DataAccessModule} from "../services/data-access.module";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmoothieManagerContainer,
    DataAccessModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
