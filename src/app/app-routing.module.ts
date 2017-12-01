import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {LocationPageComponent} from './location-page/location-page.component';
import {CatalogPageComponent} from './catalog-page/catalog-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: HomePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'location', component: LocationPageComponent },
    { path: 'catalog', component: CatalogPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
