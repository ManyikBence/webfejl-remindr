import {Component, Renderer2} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-theme',
  imports: [
    NgClass
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  selectedTheme = true;

  constructor(private renderer: Renderer2) {}

  setTheme(isLight: boolean) {
    this.selectedTheme = isLight;

    if (isLight) {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'light-mode');
    } else {
      this.renderer.removeClass(document.body, 'light-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
}
