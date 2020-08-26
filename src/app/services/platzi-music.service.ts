import { Injectable } from '@angular/core';
import * as data from './../../assets/artists.json';

@Injectable({
  providedIn: 'root',
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases() {
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

  getNewReleases1() {
    return fetch('https://platzi-music-api.now.sh/browse/new-releases', {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((response) => response.json());
  }
}
