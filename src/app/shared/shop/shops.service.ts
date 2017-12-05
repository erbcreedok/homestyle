import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {DataStorageService} from "../data-storage.service";
import {Subscription} from "rxjs/Subscription";
import {Shop} from "./shop.model";

@Injectable()
export class ShopsService {

  shopsChanged = new Subject<Shop[]>();
  private subscription: Subscription;

  private shops: Shop[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  isLoading() {
    return (this.subscription && !this.subscription.closed);
  }

  loadShops() {
    this.subscription = this.dataStorageService.loadShops().subscribe(
        (shops: Shop[]) => {
          this.shops = shops;
          this.shopsChanged.next(this.shops.slice());
        }
    );
  }

}
