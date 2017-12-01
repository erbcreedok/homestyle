import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { BindHtmlPipe } from './toolbox/pipes/bind-html.pipe';
import { AboutPageComponent } from './about-page/about-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomePageComponent,
    HeaderComponent,
    BindHtmlPipe,
    AboutPageComponent,
    LocationPageComponent,
    CatalogPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
