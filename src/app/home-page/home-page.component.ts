import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('sliderState', [
      state('in', style({opacity: '1'})),
      state('left', style({opacity: '0'})),
      state('right', style({opacity: '0'})),
      transition('in => left', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0, transform: 'translateX(-100px)', offset: .5}),
          style({opacity: 0, transform: 'translateX(100px)', offset: 0.51}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1}),
        ])),
      ]),
      transition('in => right', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0, transform: 'translateX(100px)', offset: .5}),
          style({opacity: 0, transform: 'translateX(-100px)', offset: 0.51}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1}),
        ])),
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {

  doors = [
    {
      information: '<p class="upper">CЕРИЯ <span class="door-type">U</span></p>',
      src: 'http://www.profildoors.ru/upload/iblock/367/1452869426_825340149.jpg'
    },
    {
      information: '<p class="upper">CЕРИЯ <span class="door-type">L</span></p>',
      src: 'http://www.profildoors.ru/upload/iblock/3a7/76l_wg.png'
    },
    {
      information: '<p class="upper">CЕРИЯ <span class="door-type">X</span></p>',
      src: 'http://www.profildoors.ru/upload/iblock/b96/1452880895_1323897514.jpg'
    },
    {
      information: '<p class="upper">CЕРИЯ <span class="door-type">Z</span></p>',
      src: 'http://www.profildoors.ru/upload/iblock/ee0/1452960604_1372854516.jpg'
    }
  ];
  activeDoor = 0;
  doorState = 'in';

  onDoorPressed = function(num) {
    const rotate = (num === 1) ? 'left' : 'right';
    this.doorState = rotate;
    this.doorTimer = setTimeout(() => {
      clearTimeout(this.doorTimer);
      this.activeDoor = (this.activeDoor + num + this.doors.length) % this.doors.length;
      setTimeout(() => { this.doorState = 'in'; }, 150);
    }, 150);
    console.log(rotate);
  };

  constructor() { }

  ngOnInit() {
  }

}
