import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MatSidenav, MatSidenavModule,MatToolbar, MatIcon, RouterLink, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RemindR';

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
