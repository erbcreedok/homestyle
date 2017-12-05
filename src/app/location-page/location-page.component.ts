import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopsService} from "../shared/shop/shops.service";
import {CitiesService} from "../shared/city/cities.service";
import {Shop} from "../shared/shop/shop.model";
import {City} from "../shared/city/city.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationPageComponent implements OnInit {

  shops: Shop[];
  cities: City[];
  filteredCities: City[];
  filteredCitiesToInput: City[];
  country: string = 'Казахстан';

  shopsSubscription: Subscription;
  citiesSubscription: Subscription;

  mapX = 0;
  mapY = 0;

  constructor(
      public shopsService: ShopsService,
      public citiesService: CitiesService
  ) { }

  ngOnInit() {
    this.citiesService.loadCities();
    this.citiesSubscription = this.citiesService.citiesChanged.subscribe(
        (cities: City[]) => {
          this.cities = cities;
          this.shopsService.loadShops();
          this.shopsSubscription = this.shopsService.shopsChanged.subscribe(
              (shops: Shop[]) => {
                this.shops = shops;
                this.cities.forEach((city: City) => {
                  city['shops'] = this.filterShops(city.id);
                });
                this.filteredCities = this.cities.filter(city => city['shops'].length > 0);
                this.onCountryChanged();
                this.onChangeMapPoints(this.filteredCitiesToInput[0]);
              }
          );
        }
    );
  }

  onFormSubmit(event: Event) {
    const selectedCity = this.filteredCitiesToInput[event.target[1].value];
    this.onChangeMapPoints(selectedCity);
    return false;
  }

  onCountryInputChanged(event: Event) {
    this.country = event.target['value'];
    this.onCountryChanged();
  }

  onChangeMapPoints(point) {
    this.mapX = point.x;
    this.mapY = point.y;
  }

  filterShops(cityId: number): Shop[] {
    return this.shops.filter((shop: Shop) => shop['city_id'] === cityId);
  }

  onCountryChanged() {
    this.filteredCitiesToInput = this.filteredCities.filter(city => city['country'] === this.country);
  }
}
