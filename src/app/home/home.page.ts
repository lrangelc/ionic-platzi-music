import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpt = { initialSlid: 0, slidesPerView: 1, centeredSlides: true, speed: 400 };

  slides = [
    { title: 'Este es el tituloe', subTitle: 'Este es el subtitulo', description: '', icon: 'play' },
    { title: '', subTitle: '', description: '', icon: '' },
    { title: '', subTitle: '', description: '', icon: '' },
    { title: '', subTitle: '', description: '', icon: '' },
  ];
  constructor() {}
}
