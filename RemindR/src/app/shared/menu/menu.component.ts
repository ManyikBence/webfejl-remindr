import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<String> = new EventEmitter();

  menuSwitch(pageValue:any) {
    this.selectedPage.emit(pageValue);
  }
}
