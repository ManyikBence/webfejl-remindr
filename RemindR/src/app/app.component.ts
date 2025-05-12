import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, MatSidenav, MatSidenavModule,MatToolbar, MatIcon, RouterLink, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RemindR';

  showLayout = true;

  constructor(private router: Router,
              private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.showLayout = !(
          currentUrl.startsWith('/login') || currentUrl.startsWith('/signup')
        );
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
