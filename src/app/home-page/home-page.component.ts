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
    this.doorState = (num === 1) ? 'left' : 'right';
    this.doorTimer = setTimeout(() => {
      clearTimeout(this.doorTimer);
      this.activeDoor = (this.activeDoor + num + this.doors.length) % this.doors.length;
      setTimeout(() => { this.doorState = 'in'; }, 150);
    }, 150);
  };

  constructor() { }

  ngOnInit() {
  }

  selectedCity = 'Almaty';

  cities = {
    Almaty: {
      points: [
        {
          location: [43.279465, 76.917716],
          hintContent: 'улица Казыбаева, 44',
          balloonContent: 'Магазин дверей, +77076060070, улица Казыбаева, 44'
        },
        {
          location: [43.236363, 76.845782],
          hintContent: 'ул. Кабдолова 1/8',
          balloonContent: 'ТК "ARMADA" 1 блок, 106 бутик, +77076060070'
        },
        {
          location: [43.280027, 76.888573],
          hintContent: 'пр-т Рыскулова 103',
          balloonContent: 'ТЦ "Строй Сити" бутик 80 "Г"'
        },
        {
          location: [43.242653, 76.890521],
          hintContent: 'ул. Розыбакиева 72',
          balloonContent: 'ТЦ "Саламат-3" 41 бутик'
        }
      ],
      center: [43.257839, 76.878916],
      zoom: 11
    },
    Astana: {
      points:[
        {
          location: [51.121989, 71.422180],
          hintContent: 'ТЦ Комфорт, ул.Сауран, 8',
          balloonContent: 'ТЦ Комфорт, ул.Сауран, 8, 2 этаж'
        },
        {
          location: [51.161630, 71.457846],
          hintContent: 'ул. Иманова, 41',
          balloonContent: 'ул. Иманова, 41'
        },
        {
          location: [51.174597, 71.392655],
          hintContent: 'пр-т Богенбай Батыра, 6/5',
          balloonContent: 'Строительный рынок Эталон,пр-т Богенбай Батыра, 6/5 (1 этаж)'
        },
        {
          location: [51.189886, 71.457918],
          hintContent: 'шоссе Алаш, 20А',
          balloonContent: '12 месяцев, ш.Алаш, 20А, 2 этаж, 32 бутик'
        },
        {
          location: [51.173174, 71.392197],
          hintContent: '1-я Алматинская улица, 41А',
          balloonContent: 'Строительный рынок Эталон, ул.Алматинская 1-ая, 41/2 (1 этаж, 2 этаж 25 бутик)'
        }
      ],
      center: [51.148433, 71.430546],
      zoom: 10
    },
    Karaganda: {
      points:[
        {
          location: [49.795257, 73.130321],
          hintContent: 'Строймарт, 137 учетный квартал 039 строение, бутик 1Д',
          balloonContent: 'Строймарт, 137 учетный квартал 039 строение, бутик 1Д'
        }

      ],
      center: [49.806406, 73.085485],
      zoom: 10
    },
    Shymkent: {
      points:[
        {
          location: [42.336925, 69.579846],
          hintContent: 'пр-т Байдибек-би 91',
          balloonContent: 'пр-т Байдибек-би 91'
        }

      ],
      center: [42.315514, 69.586907],
      zoom: 10
    }
  };

}
