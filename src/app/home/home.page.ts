import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  slideOps = { initialSlid: 2, slidesPerView: 4, centeredSlides: true, speed: 400 };

  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {
    this.musicService.getArtists().subscribe((data) => {
      this.artists = data;
    });

    this.musicService.getNewReleases().subscribe((newReleases) => {
      this.songs = newReleases.filter((e) => e.type === 'single');
      this.albums = newReleases.filter((e) => e.type === 'album');
    });
  }
}
