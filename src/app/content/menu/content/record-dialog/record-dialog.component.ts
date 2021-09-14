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
    @Inject(MAT_DIALOG_DATA) public dialogData: { Record: IRecord },
    private recordSvc: RecordService
  ) { }

  ngOnInit(): void {
    if (this.dialogData) {
      this.validateForm.patchValue(this.dialogData.Record);
    }
  }


  handleSubmit(crudType: string): void {

    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }
    if (crudType === CRUD_CONFIG.CREATE || crudType===CRUD_CONFIG.UPDATE) {
      this.dialogRef.close(this.validateForm.value);
    }
  }
}
