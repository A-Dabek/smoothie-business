import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SmoothieMenuContainer} from "../containers/smoothie-menu.container";
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
    SmoothieMenuContainer,
    DataAccessModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
