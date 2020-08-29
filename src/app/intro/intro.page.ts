import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage  {
  slideOpt = { initialSlid: 0, slidesPerView: 1, centeredSlides: true, speed: 400 };

  slides = [
    { title: 'Este es el tituloe', subTitle: 'Este es el subtitulo', description: '', icon: 'play' },
    { title: '', subTitle: '', description: '', icon: '' },
    { title: '', subTitle: '', description: '', icon: '' },
    { title: '', subTitle: '', description: '', icon: '' },
  ];

  constructor(private router: Router, private storage: Storage) {}

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/menu');
  }
}
