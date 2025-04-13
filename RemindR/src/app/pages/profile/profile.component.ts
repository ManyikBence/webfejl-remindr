import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/list';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    MatCard,
    MatDivider,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isEditing = false;

  user = {
    name: 'Kovács Péter',
    email: 'peter.kovacs@gmail.com',
    about: 'Szenvedélyes fejlesztő és sorozatfüggő.',
    registered: '2023.04.12',
    avatar: 'KP'
  };

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
  }
}
