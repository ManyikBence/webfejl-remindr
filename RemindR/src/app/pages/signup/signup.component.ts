import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  imports: [
    MatFormField,
    MatInput,
    MatSuffix,
    MatIcon,
    MatLabel,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router: Router) {}

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.required])
  })

  isLoading = false;
  showForm = true;
  signupError = '';

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'A regisztráció sikertelen.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      username: this.signUpForm.value.username || '',
      password: this.signUpForm.value.password || ''
    };

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }
}
