import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  onWhiteLogo = ['location', 'catalog'];
  isWhiteLogo: boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.router.events.subscribe(
        (event) => {
          if (event instanceof NavigationEnd) {
            this.isWhiteLogo = this.onWhiteLogo.indexOf(event.urlAfterRedirects.slice(1)) !== -1;
          }
        }
    );
  }



  ngOnInit() {
  }


}
