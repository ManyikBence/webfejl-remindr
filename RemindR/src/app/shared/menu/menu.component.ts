import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    MatNavList,
    MatListItem,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() sidenav!: MatSidenav;

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
