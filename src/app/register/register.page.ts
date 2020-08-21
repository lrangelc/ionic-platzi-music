import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticateService } from './../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validationMessage = {
    firstName: [{ type: 'required', message: 'El nombre es requerido' }],
    lastName: [{ type: 'required', message: 'El apellido es requerido' }],
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
    ],
  };
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  ngOnInit() {}

  registerUser() {
    console.log(this.registerForm.get('firstName').value);
    console.log(this.registerForm.get('lastName').value);
    console.log(this.registerForm.get('email').value);
    console.log(this.registerForm.get('password').value);
    this.authService
      .registerUser(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value
      )
      .then((res) => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/home');
      })
      .catch((err) => {
        this.errorMessage = err;
      });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
