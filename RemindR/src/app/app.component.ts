import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MenuComponent} from './shared/menu/menu.component';
import {ProfileComponent} from './pages/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, MenuComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RemindR';

  page = "home"

  changePage(selectedPage:any) {
    this.page = selectedPage;
  }
}
