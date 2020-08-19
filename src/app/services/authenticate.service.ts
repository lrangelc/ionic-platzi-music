import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  loginUser(email, password) {
    return new Promise((accept, reject) => {
      if (email === 'test@test.com' && password === '123456') {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }
}
