import { RecordDialogComponent } from './content/record-dialog/record-dialog.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionDialogComponent } from './content/action-dialog/action-dialog.component';


@NgModule({
  declarations: [
    MenuComponent,
    ActionDialogComponent,
    RecordDialogComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MenuModule { }
