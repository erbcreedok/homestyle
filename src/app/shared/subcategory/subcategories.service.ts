import { Injectable } from '@angular/core';
import {Subcategory} from "./subcategory.model";
import {Subject} from "rxjs/Subject";
import {DataStorageService} from "app/shared/data-storage.service";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class SubcategoriesService {
  subcategoriesChanged = new Subject<Subcategory[]>();
  private subscription: Subscription;

  private subcategories: Subcategory[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  isLoading() {
    return (this.subscription && !this.subscription.closed);
  }

  loadSubcategories() {
    this.subscription = this.dataStorageService.loadSubcategories().subscribe(
        (subcategories: Subcategory[]) => {
          this.subcategories = subcategories;
          this.subcategoriesChanged.next(this.subcategories.slice());
        }
    );
  }

  getSubcategory(index: number) {
    return this.subcategories[index];
  }

  getSubcategories() {
    return this.subcategories.slice();
  }
}
