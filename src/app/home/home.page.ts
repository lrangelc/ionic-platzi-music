import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatziMusicService } from '../services/platzi-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

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

  constructor(private musicService: PlatziMusicService, private modalController: ModalController) {}

  ionViewDidEnter() {
    this.musicService.getArtists().subscribe((data) => {
      this.artists = data;
    });

    this.musicService.getNewReleases().subscribe((newReleases) => {
      this.songs = newReleases.filter((e) => e.type === 'single');
      this.albums = newReleases.filter((e) => e.type === 'album');
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name,
      },
    });
    modal.present();
  }
}
