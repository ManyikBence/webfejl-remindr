import {Component, OnInit} from '@angular/core';
import {Subscriptions} from '../../shared/constant';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  Subscriptions = Subscriptions

  selectedIndex = 0;

  ngOnInit() {
    this.selectedIndex = 0;
  }

  reload(index:number) {
    this.selectedIndex = index;
  }
}
