import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { BindHtmlPipe } from './toolbox/pipes/bind-html.pipe';
import { AboutPageComponent } from './about-page/about-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import {HttpModule} from '@angular/http';
import {DataStorageService} from './shared/data-storage.service';
import {DoorsService} from './shared/door/doors.service';
import {SubcategoriesService} from './shared/subcategory/subcategories.service';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';

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
    BrowserAnimationsModule,
    HttpModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    DataStorageService,
    DoorsService,
    SubcategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
