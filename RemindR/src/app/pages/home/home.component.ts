import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {NgForOf, NgIf} from '@angular/common';

export interface Subscriptions {
  id: number;
  name: string;
  online: boolean;
  endDate: string;
  repetitive: boolean;
  picture?: string;
}

@Component({
  selector: 'app-home',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatButton,
    MatTable,
    MatCardTitle,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    NgIf,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  title = "Előfizetések";
  isMobileView = false;

  subscriptions: Subscriptions[] = [
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    },
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    },
    {
      id: 1,
      picture: 'assets/images/netflix.png',
      name: 'Netflix',
      online: true,
      endDate: '2025.06.12',
      repetitive: true,
    },
    {
      id: 2,
      picture: 'assets/images/profilpic.jpg',
      name: 'Személyi igazolvány',
      online: false,
      endDate: '2028.01.10',
      repetitive: false,
    },
    {
      id: 3,
      picture: 'assets/images/mav.jpg',
      name: 'Országbérlet',
      online: true,
      endDate: '2025.04.20',
      repetitive: true,
    },
    {
      id: 4,
      picture: 'assets/images/hbo.jpg',
      name: 'HBO',
      online: true,
      endDate: '2025.05.02',
      repetitive: true,
    }
  ]

  displayedColumns: string[] = ['picture', 'name', 'online', 'endDate', 'repetitive'];
  dataSource = new MatTableDataSource<Subscriptions>(this.subscriptions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 560;
  }

  addSubscription() {
    // új előfizetés logika
  }
}
