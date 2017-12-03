import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Door} from "app/shared/door/door.model";
import {Subcategory} from "./subcategory/subcategory.model";

@Injectable()
export class DataStorageService {
  constructor(private http: Http) {}

  loadDoors() {
    return this.http.get('https://homestyle-e3b26.firebaseio.com/products.json').map(
        (response: Response) : Door[] => {
          return response.json();
        }
    );
  }

  loadSubcategories() {
      return this.http.get('https://homestyle-e3b26.firebaseio.com/subcategories.json').map(
          (response: Response) : Subcategory[] => {
              return response.json();
          }
      );
  }
}