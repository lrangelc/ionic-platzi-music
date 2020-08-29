import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
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
  song: { preview_url: string; playing: boolean; name: string; popularity: number } = {
    playing: false,
    preview_url: '',
    name: '',
    popularity: 0,
  };
  slideOps = { initialSlid: 2, slidesPerView: 4, centeredSlides: true, speed: 400 };
  currentSong: HTMLAudioElement;
  newTime = {};
  playing = false;

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
    this.musicService.getArtistTopTracks(artist.id).subscribe(async (data) => {
      const songs = data;

      const modal = await this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          songs: songs.tracks,
          artist,
        },
      });
      modal.onDidDismiss().then((dataReturned) => {
        this.song = dataReturned.data;
        if (this.playing) {
          this.pause();
        }
        this.play();
      });

      modal.present();
    });

    // const songs: Observable<any> = await this.musicService.getArtistTopTracks(artist.id);

    // const modal = await this.modalController.create({
    //   component: SongsModalPage,
    //   componentProps: {
    //     songs: songs.tracks,
    //     artist,
    //   },
    // });
    // modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      // this.newTime = ( 1 / this.currentSong.duration ) * this.currentSong.currentTime;
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    });
    this.song.playing = true;
    this.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
    this.playing = false;
  }

  parseTime(time = '00:00') {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + minutes;
      }
      return minutes + ':' + seconds;
    }
    return null;
  }
}
