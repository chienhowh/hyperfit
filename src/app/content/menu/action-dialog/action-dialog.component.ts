import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {
  validateForm: FormGroup = this.fb.group({
    part: ['', Validators.required],
    content: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef
  ) { }

  bodyPart = [
    { viewValue: '胸', value: 'chest' },
    { viewValue: '背', value: 'back' },
    { viewValue: '腿', value: 'legs' },
  ]

  action = {
    chest: [
      { viewValue: '伏地挺身', value: 'pushup' },
      { viewValue: '槓鈴臥推', value: 'barbell' },
      { viewValue: '啞鈴臥推', value: 'dumbell' },
    ],
    back: [
      { viewValue: '引體向上', value: 'pullup' },
      { viewValue: '滑輪下拉', value: 'pulldown' },
      { viewValue: '槓鈴划船', value: 'barbellrow' }
    ],
    legs: [
      { viewValue: '深蹲', value: 'squat' },
      { viewValue: '硬舉', value: 'deadlift' },
      { viewValue: '分腿蹲', value: 'dumbell' },
    ]
  }
  actionOpts = this.action.chest;

  ngOnInit(): void {
  }

  handlePartChange(part: MatSelectChange) {
    console.log(part.value);
    this.actionOpts = this.action[part.value];
  }

  handleSubmit(): void {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }

    this.dialogRef.close(true)
    // this.menuSvc.postMenu(params).subscribe(() => this.dialogRef.close(true));


  }

}
