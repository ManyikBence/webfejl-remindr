import { Component } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';

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

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  )
  {}

  login() {
    if (this.email.invalid) {
      this.loginError = 'Helyes email-t adj meg.';
      return;
    }

    if (this.password.invalid) {
      this.loginError = 'Jelszó minimum 6 karakter hosszú legyen.';
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';

    this.authService.signIn(emailValue, passwordValue)
      .then(userCredential => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.showLoginForm = true;

        switch(error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nem létező email';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Helytelen email vagy jelszó';
            break;
          default:
            this.loginError = 'Hiba, próbáld újra';
        }
      });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
