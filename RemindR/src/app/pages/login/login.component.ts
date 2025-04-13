import { Component } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatProgressSpinner,
    MatFormField,
    MatButton,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    RouterLink,
    MatLabel,
    MatSuffix,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;

  constructor() {}

  login() {
    this.loginError = '';

    if (this.username.value === 'test' && this.password.value === 'test') {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    }
    else if (this.username.value === '' || this.password.value === '') {
      this.loginError = 'Nincs kitöltve minden adat.';
    }
    else {
      this.loginError = 'Helytelen felhasználónév vagy jelszó.';
    }
  }
}
