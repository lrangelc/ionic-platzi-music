import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as dataArtists from './../../assets/artists.json';
import * as dataTopTracks from './../../assets/topTracks.json';

@Injectable({
  providedIn: 'root',
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases(): Observable<any> {
    return of(dataArtists.items);
  }

  getArtists(): Observable<any> {
    return of(dataArtists.items);
  }

  getNewReleases1() {
    const promise = new Promise(function (resolve, reject) {
      if (dataArtists) {
        resolve(dataArtists);
      } else {
        reject(Error('It broke'));
      }
    });

    return promise.then(
      function (result) {
        return result;
      },
      function (err) {
        console.log(err); // Error: "It broke"
      }
    );
  }

  getArtists2() {
    return dataArtists.items;
  }

  getNewReleases2() {
    return fetch('https://platzi-music-api.now.sh/browse/new-releases', {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => response.json());
  }

  getArtistTopTracks(artistId): Observable<any> {
    return of(dataTopTracks.items.filter((e) => e.id === artistId)[0]);
  }

  getArtistTopTracks1(artistId) {
    return fetch(`https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=CO`, {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => response.json());
  }
}
