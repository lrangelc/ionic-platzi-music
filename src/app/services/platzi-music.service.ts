import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as data from './../../assets/artists.json';

@Injectable({
  providedIn: 'root',
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases(): Observable<any> {
    return of(data.items);
  }

  getArtists(): Observable<any> {
    return of(data.items);
  }

  getNewReleases1() {
    const promise = new Promise(function (resolve, reject) {
      if (data) {
        resolve(data);
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
    return data.items;
  }

  getNewReleases2() {
    return fetch('https://platzi-music-api.now.sh/browse/new-releases', {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => response.json());
  }
}
