import { RecordService } from './../../../../core/services/record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, inject, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRecord } from 'src/app/core/interfaces/server.interface';
import { CRUD_CONFIG } from 'src/app/core/const/api.const';

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {
  CRUD_CONFIG = CRUD_CONFIG;
  validateForm: FormGroup = this.fb.group({
    reps: ['', Validators.required],
    weight: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {
      Record: IRecord, actionId: string,
      crudType: string
    },

  ) { }

  ngOnInit(): void {
    if (this.dialogData.crudType === CRUD_CONFIG.UPDATE) {
      this.validateForm.patchValue(this.dialogData.Record);
    }
  }


  handleSubmit(): void {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }
    this.dialogRef.close({ formValue: this.validateForm.value, crudType: this.dialogData.crudType });
  }

  handleDelete(): void {
    this.dialogRef.close({ crudType: this.CRUD_CONFIG.DELETE });
  }
}
