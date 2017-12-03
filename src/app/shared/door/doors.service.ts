import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Door} from "./door.model";
import {DataStorageService} from "../data-storage.service";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class DoorsService {
  doorsChanged = new Subject<Door[]>();

  subscription: Subscription;

  private doors: Door[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  isLoading() {
    return (this.subscription && !this.subscription.closed);
  }

  loadDoors() {
    this.subscription = this.dataStorageService.loadDoors().subscribe(
        (doors: Door[]) => {
          this.doors = doors;
          this.doorsChanged.next(this.doors.slice());
        }
    );
  }

  getDoor(index: number) {
    return this.doors[index];
  }

  getDoors() {
    return this.doors.slice();
  }

}
