import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {
  validateForm: FormGroup = this.fb.group({
    reps: ['', Validators.required],
    weight: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
  ) { }

  ngOnInit(): void {
  }


  handleSubmit(): void {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }
    this.dialogRef.close(this.validateForm.value);
  }
}
