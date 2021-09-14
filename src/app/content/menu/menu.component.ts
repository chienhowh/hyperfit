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
import { config, from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  validateForm: FormGroup;
  menuId: string;
  /** 菜單 */
  menu: IMenu;
  /** 各組動作 */
  actionList: IAction[] = [];
  totalSets = 0;
  trainingTime = 0;
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
      ).subscribe((action: IAction) => {
        this.actionList.push(action);
        // this.totalWeights += this.calcTotalWeights(action);
        this.totalSets += action.records.length;
      });
    });
  }

  calcTotalWeights(action: IAction): number {
    let actionWeights = 0;
    action.records.forEach(r => actionWeights += (r.weight * r.reps)
    );
    return actionWeights;
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
   * @param row row資料
   */
  handleRecord(actionId: number, records: IRecord[], rowRecord?: IRecord): void {
    this.openingPanel = actionId;
    // 編輯record
    if (rowRecord) {
      this.dialog.open(RecordDialogComponent, {
        data: {
          Record: rowRecord,
          actionId,
        },
      }).afterClosed().subscribe((record) => {
        if (!record) { return; }
        this.updateRecord(actionId, rowRecord.record_id, record).subscribe(() => this.getMenuById());
      });
    } else {
      // 新增record
      // 沒有record，打開設定dialog
      if (records.length === 0) {
        this.dialog.open(RecordDialogComponent).afterClosed().subscribe((record) => {
          if (!record) { return; }
          this.newRecord(actionId, record).subscribe(() => this.getMenuById());
        });
      } else {
        // 有records，則預設上一組設定
        this.newRecord(actionId, { weight: records[0].weight, reps: records[0].reps }).subscribe(() => {
          this.getMenuById();
        });
      }
    }

  }

  newRecord(actionId: number, data: { weight: number, reps: number }): Observable<any> {
    return this.recordSvc.newRecord(this.menuId, actionId, data);
  }
  updateRecord(actionId: number, recordId: number, data: { weight: number, reps: number }): Observable<any> {
    return this.recordSvc.updateRecord(this.menuId, actionId, recordId, data);
  }



}
