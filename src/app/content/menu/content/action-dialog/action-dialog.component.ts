import { ActionsService } from '../../../../core/services/actions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
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
    private dialogRef: MatDialogRef<ActionDialogComponent>,
    private actionSvc: ActionsService,
    @Inject(MAT_DIALOG_DATA) public data: { menuId: string }
  ) { }

  bodyPart = [
    { viewValue: '胸', value: 'chest' },
    { viewValue: '背', value: 'back' },
    { viewValue: '腿', value: 'legs' },
  ];

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
  };
  actionOpts = this.action.chest;

  ngOnInit(): void {
  }

  handlePartChange(part: MatSelectChange) {
    this.actionOpts = this.action[part.value];
  }

  handleSubmit(): void {
    this.validateForm.markAllAsTouched();
    if (this.validateForm.invalid) { return; }
    const content = this.validateForm.get('content').value;
    this.dialogRef.close(true);
    this.actionSvc.postAction(this.data.menuId, {content}).subscribe(() => this.dialogRef.close(true));


  }

}
