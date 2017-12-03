import {Component, OnDestroy, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';
import {Door} from "../shared/door/door.model";
import {DoorsService} from "../shared/door/doors.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Subcategory} from "../shared/subcategory/subcategory.model";
import {SubcategoriesService} from "../shared/subcategory/subcategories.service";
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import _ from 'lodash';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
  animations: [
    trigger('fading', [
      state('show', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 1}),
        animate('100ms 150ms ease-out')
      ]),
      transition('* => void', [
        style({opacity: 0}),
        animate('100ms ease-out')
      ]),
    ])
  ]
})
export class CatalogPageComponent implements OnInit, OnDestroy {

  doors: Door[] = [];
  allDoors: Door[] = [];
  subcategories: Subcategory[];
  visibleDoors: Door[] = [];
  doorsSubscription: Subscription;
  subcategoriesSubscription: Subscription;
  queryParamsSubscription: Subscription;
  activePage: number = 1;
  activeSubcategory: number;
  pages: number[] = [];
  lastPage = 1;

  constructor(private doorsService: DoorsService,
              private subcategoriesService: SubcategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private scrollToService: ScrollToService) {}

  ngOnInit() {
    this.onDoorsLoad();
    this.onSubcategoriesLoad();
    this.doorsSubscription = this.doorsService.doorsChanged.subscribe(
        (doors: Door[]) => {
          this.allDoors = doors;
          this.routeChanged(this.activePage);
        }
    );
    this.subcategoriesSubscription = this.subcategoriesService.subcategoriesChanged.subscribe(
        (subcategories: Subcategory[]) => {
          this.subcategories = subcategories;
        }
    );
    this.queryParamsSubscription = this.route.queryParams.subscribe(
        (data) => {
          if (data['page']) {
            this.activePage = +data['page'];
            if (this.activePage <= 1) {
              this.goToPage(1);
            } else if (this.activePage > this.lastPage) {
              this.goToPage(this.lastPage);
            }
          } else {
            this.activePage = 1;
          }
          if (data['subcategory']) {
            this.activeSubcategory = +data['subcategory'];
          } else {
            this.activeSubcategory = undefined;
          }
          this.routeChanged(this.activePage);
        }
    );
  }

  routeChanged(page: number) {
    if (this.activeSubcategory) {
      this.doors = this.allDoors.filter( door => { return door['subcategory_id'] === this.activeSubcategory });
    } else {
      this.doors = this.allDoors;
    }
    this.lastPage = Math.ceil(this.doors.length / 12);
    this.pages = this.getPages();
    this.visibleDoors = this.doors.slice(( page - 1 ) * 12, page * 12);
    this.triggerScrollTo('#catalog-body');
  }

  onSelectSubcategory (subcategoryId: any) {
    if (subcategoryId === 'all') {
      this.router.navigate(['/catalog']);
    } else {
      this.router.navigate(['/catalog'], {queryParams: {subcategory: subcategoryId}})
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.lastPage) {
      return;
    }
    if (page === 1) {
      this.router.navigate(['/catalog']);
    }
    this.router.navigate(['/catalog'], {queryParams: {page: page, subcategory: this.activeSubcategory}});
  }

  getPages() {
    const pageLimits = 3;
    let startPage: number, endPage: number;
    if (this.lastPage <= pageLimits) {
      startPage = 1;
      endPage = this.lastPage;
    } else {
      if ( this.activePage <= Math.ceil(pageLimits / 2)) {
        startPage = 1;
        endPage = pageLimits;
      } else if (this.activePage + Math.ceil(pageLimits / 2) >= this.lastPage) {
        startPage = this.lastPage - pageLimits + 1;
        endPage = this.lastPage;
      } else {
        startPage = this.activePage - Math.ceil(pageLimits / 2);
        endPage = this.activePage + pageLimits - 1;
      }
    }
    return _.range(startPage, endPage + 1);
  }

  ngOnDestroy() {
    this.doorsSubscription.unsubscribe();
    this.subcategoriesSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  onDoorsLoad = function() {
    this.doorsService.loadDoors();
  }

  onSubcategoriesLoad = function() {
    this.subcategoriesService.loadSubcategories();
  }

  isLoading() : boolean {
    return this.doorsService.isLoading() || this.subcategoriesService.isLoading();
  }

  public triggerScrollTo(target: string) {

    const config: ScrollToConfigOptions = {
      target: target,
      offset: 700
    };

    this.scrollToService.scrollTo(config);
  }


}
