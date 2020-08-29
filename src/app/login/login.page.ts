import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticateService } from './../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessage = {
    email: [
      { type: 'required', message: 'El email es requerido' },
      {
        type: 'email',
        message: 'ojo! este no es un email valido',
      },
    ],
    password: [
      { type: 'required', message: 'El password es requerido' },
      {
        type: 'minlength',
        message: 'Tamaño minimo 6 caracteres',
      },
      // {
      //   type: 'pattern',
      //   message: 'Tamaño minimo 6 caracteres',
      // },
    ],
  };
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
        ])
      ),
    });
  }

  ngOnInit() {}

  loginUser() {
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('password').value);
    this.authService
      .loginUser(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then((res) => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/menu');
      })
      .catch((err) => {
        this.errorMessage = err;
      });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
