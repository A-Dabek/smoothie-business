import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SmoothieMenuContainer} from "../containers/smoothie-menu.container";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmoothieMenuContainer
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
