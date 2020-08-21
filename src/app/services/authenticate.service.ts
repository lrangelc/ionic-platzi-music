import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private storage: Storage) {}

  loginUser(email, password) {
    return new Promise(async (accept, reject) => {
      const userData = await this.storage.get(`user|${email}`);
      if (userData) {
        if (email === userData.email && password === atob(userData.password)) {
          accept('Login correcto');
        } else {
          reject('Login incorrecto');
        }
      } else {
        reject('Email no existe');
      }
    });
  }

  registerUser(firstName, lastName, email, password) {
    const userData = {
      firstName,
      lastName,
      email,
      password: btoa(password),
    };
    this.storage.set(`user|${email}`, userData);
    return new Promise((accept, reject) => {
      if (email === 'test@test.com' && password === '123456') {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }
}
