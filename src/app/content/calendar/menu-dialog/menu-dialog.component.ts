import { MenusService } from './../../../core/services/menus.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  validateForm = this.fb.group({
    name: ['', Validators.required],
    plan_time: ['', Validators.required],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    private fb: FormBuilder,
    private menuSvc: MenusService
  ) { }

  ngOnInit(): void {
    const createTime = this.data?.time ?? moment();
    this.validateForm.get('plan_time').patchValue(createTime);
  }

  handleSubmit(): void {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }

    const plan_time = this.validateForm.get('plan_time').value.format('YYYY-MM-DD');
    const params = { ...this.validateForm.value, plan_time };
    this.menuSvc.postMenu(params).subscribe(() => this.dialogRef.close(true));


  }
}
