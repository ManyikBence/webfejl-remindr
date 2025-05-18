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
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
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
