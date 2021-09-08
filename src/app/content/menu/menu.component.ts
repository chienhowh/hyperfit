import { RecordDialogComponent } from './content/record-dialog/record-dialog.component';
import { ActionsService } from './../../core/services/actions.service';
import { ActionDialogComponent } from './content/action-dialog/action-dialog.component';
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
  actionList: IAction[] = [];
  panelOpenState = false;
  constructor(
    private fb: FormBuilder,
    private menusSvc: MenusService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private actionSvc: ActionsService
  ) { }

  ngOnInit(): void {
    this.menuId = this.activateRoute.snapshot.params['menuid'];
    this.getMenuById();
    this.initForm();
  }
  initForm(): void {
    this.validateForm = this.fb.group({

    });
  }

  /** 取得菜單 */
  getMenuById(): void {
    this.menusSvc.getMenuById(this.menuId).subscribe(res => {
      this.menu = res;
      res.actions.forEach(action => this.getActionById(action.action_id));
    });
  }


  /** 取得動作 */
  getActionById(actionId: number): void {
    this.actionSvc.getActionById(this.menuId, actionId).subscribe(res => this.actionList.push(res));
  }

  /**
   * 新增動作
   */
  handleNewAction(): void {
    const dialogRef = this.dialog.open(ActionDialogComponent, { data: { menuId: this.menuId } });
    // 如有新增menu，關閉dialog刷新calendar
    dialogRef.afterClosed().subscribe((res) => {
      if (res) { this.getMenuById(); }
    });
  }

  handleNewRecord(): void {
    const dialogRef = this.dialog.open(RecordDialogComponent);
  }



}
