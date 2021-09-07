import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { MenusService } from './../../core/services/menus.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMenu, IAction } from '../../core/interfaces/server.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  validateForm: FormGroup;
  menuId: string;
  menu: IMenu;
  panelOpenState = false;
  constructor(
    private fb: FormBuilder,
    private menusSvc: MenusService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.menuId = this.activateRoute.snapshot.params['menuid'];
    this.getMenuById(this.menuId);
    this.initForm();
  }
  initForm(): void {
    this.validateForm = this.fb.group({

    });
  }

  getMenuById(menuId: string): void {
    this.menusSvc.getMenuById(menuId).subscribe(res => this.menu = res);
  }

  /**
   * 新增動作
   */
  hanleNewAction() {
    const dialogRef = this.dialog.open(ActionDialogComponent);
    // 如有新增menu，關閉dialog刷新calendar
    dialogRef.afterClosed().subscribe((res) => {
      // if (res) { this.getMenus(); }
    });
  }



}
