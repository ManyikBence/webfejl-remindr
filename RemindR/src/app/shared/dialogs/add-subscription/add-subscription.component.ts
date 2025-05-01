import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subscription-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  template: `
    <h2>Új előfizetés hozzáadása</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Név</mat-label>
        <input matInput formControlName="name">
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Lejárat dátuma</mat-label>
        <input matInput type="date" formControlName="endDate">
      </mat-form-field>

      <mat-checkbox formControlName="online">Online előfizetés</mat-checkbox>
      <br>
      <mat-checkbox formControlName="repetitive">Ismétlődő</mat-checkbox>

      <div class="actions">
        <button mat-button type="button" (click)="dialogRef.close()">Mégse</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Mentés</button>
      </div>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    .actions {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `]
})
export class AddSubscriptionDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      endDate: ['', Validators.required],
      online: [false],
      repetitive: [false]
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
