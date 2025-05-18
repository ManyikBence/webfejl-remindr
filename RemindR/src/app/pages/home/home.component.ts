import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {AddSubscriptionDialogComponent} from '../../shared/dialogs/add-subscription/add-subscription.component';
import {Subscriptions} from '../../shared/models/subscription';
import {combineLatest, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


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
export class HomeComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  @Input() title = "Előfizetések";

  isMobileView = false;
  isLoading = false;
  subs: Subscriptions[] = [];
  displayedColumns: string[] = ['picture', 'name', 'online', 'endDate', 'repetitive'];
  dataSource = new MatTableDataSource<Subscriptions>(this.subs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadAllSubscriptionData();
    this.dataSource.paginator = this.paginator;
    this.checkScreenSize();

    this.subscriptionService.getAllSubscriptions().subscribe(subs => {
      this.subs = subs;
      this.dataSource.data = subs;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAllSubscriptionData(): void {
    this.isLoading = true;

    const allSubscriptions$ = this.subscriptionService.getAllSubscriptions();

    const combined$ = combineLatest([
      allSubscriptions$
    ]);

    const subscription = combined$.subscribe({
      next: ([allSubscriptions]) => {
        this.subs = allSubscriptions;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showNotification('Error loading tasks', 'error');
      }
    });

    this.subscriptions.push(subscription);
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
            this.subs = subs;
            this.dataSource.data = subs;
          });
        });
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [`snackbar-${type}`]
    });
  }

}
