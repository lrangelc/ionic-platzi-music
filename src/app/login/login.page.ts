import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    ],
  };

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  ngOnInit() {}

  loginUser() {}
}
