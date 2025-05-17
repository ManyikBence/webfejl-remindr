import {AfterViewInit, Component, HostListener, Input, ViewChild} from '@angular/core';
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
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SubscriptionService} from '../../shared/services/subscription.service';
import {AddSubscriptionDialogComponent} from '../../shared/dialogs/add-subscription/add-subscription.component';
import {Subscriptions} from '../../shared/models/subscription';


@Component({
  selector: 'app-home',
  imports: [
    MatCard,
    MatDialogModule,
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
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService,
    private dialog: MatDialog
  ) {}

  @Input() title = "Előfizetések";

  isMobileView = false;

  subscriptions: Subscriptions[] = [];

  displayedColumns: string[] = ['picture', 'name', 'online', 'endDate', 'repetitive'];
  dataSource = new MatTableDataSource<Subscriptions>(this.subscriptions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.checkScreenSize();

    this.subscriptionService.getAllSubscriptions().subscribe(subs => {
      this.subscriptions = subs;
      this.dataSource.data = subs;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 650;
  }

  addSubscription() {
    const dialogRef = this.dialog.open(AddSubscriptionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptionService.addSubscription(result).then(() => {
          this.subscriptionService.getAllSubscriptions().subscribe(subs => {
            this.subscriptions = subs;
            this.dataSource.data = subs;
          });
        });
      }
    });
  }
}
