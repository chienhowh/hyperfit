import { RecordService } from './../../core/services/record.service';
import { RecordDialogComponent } from './content/record-dialog/record-dialog.component';
import { ActionsService } from './../../core/services/actions.service';
import { ActionDialogComponent } from './content/action-dialog/action-dialog.component';
import { MenusService } from './../../core/services/menus.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMenu, IAction, IRecord } from '../../core/interfaces/server.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
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
  /** 正在使用的panel */
  openingPanel: number;

  displayedColumns: string[] = ['reps', 'weight'];
  constructor(
    private fb: FormBuilder,
    private menusSvc: MenusService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private actionSvc: ActionsService,
    private recordSvc: RecordService
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
    this.actionList = [];
    this.menusSvc.getMenuById(this.menuId).subscribe(res => {
      this.menu = res;
      // 照順序取動作
      from(res.actions).pipe(
        concatMap((a: IAction) => this.getActionById(a.action_id))
      ).subscribe((action: IAction) => this.actionList.push(action));

    });
  }


  /** 取得動作 */
  getActionById(actionId: number): Observable<IAction> {
    return this.actionSvc.getActionById(this.menuId, actionId);
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

  /**
   * 新增組數
   *
   */
  handleNewRecord(actionId: number, records: IRecord[]): void {
    this.openingPanel = actionId;
    // 沒有record，打開設定dialog
    if (records.length === 0) {
      this.dialog.open(RecordDialogComponent).afterClosed().subscribe((res) => {
        for (const i of Object.keys(res)) { res[i] = +res[i]; }
        this.newRecord(actionId, res).subscribe(() => this.getMenuById());
      });
    } else {
      // 有records，則預設上一組設定
      this.newRecord(actionId, { weight: records[0].weight, reps: records[0].reps }).subscribe(() => {
        this.getMenuById();
      });
    }
  }

  newRecord(actionId: number, data: { weight: number, reps: number }): Observable<any> {
    return this.recordSvc.newRecord(this.menuId, actionId, data);
  }


}
