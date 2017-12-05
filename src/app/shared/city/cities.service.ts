import { Injectable } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {City} from "./city.model";
import {Subject} from "rxjs/Subject";
import {DataStorageService} from "../data-storage.service";

@Injectable()
export class CitiesService {
  citiesChanged = new Subject<City[]>();
  private subscription: Subscription;

  private cities: City[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  isLoading() {
    return (this.subscription && !this.subscription.closed);
  }

  loadCities() {
    this.subscription = this.dataStorageService.loadCities().subscribe(
        (cities: City[]) => {
          this.cities = cities;
          this.citiesChanged.next(this.cities.slice());
        }
    );
  }
}
