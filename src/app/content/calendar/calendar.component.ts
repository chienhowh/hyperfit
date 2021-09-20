import { ROUTING_PATH } from './../../core/const/routing-path.const';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { MenusService } from './../../core/services/menus.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

import { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { IMenu } from '../../core/interfaces/server.interface';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  /** 行事曆設定 */
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [],
    contentHeight: 600,
    eventClick: (info) => {
      const menu_id = info.event.extendedProps.menu_id;
      this.handleMenuClick(menu_id);
    },
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'prev today next'
    },
    titleFormat:
      { year: 'numeric', month: 'short' },
  };

  constructor(
    private menuSvc: MenusService,
    private dialog: MatDialog,
    private route: Router,
  ) { }

  ngOnInit(): void {
    // TODO:插入ＡＰＩ
    this.getMenus();
    // this.calendarOptions.events = this.menuList.map(m => ({ ...m, title: m.name, date: m.plan_time }));

  }


  /** 取得菜單日期 */
  getMenus(): void {
    this.menuSvc.getMenus().subscribe((res: IMenu[]) =>
      // 換成fullcalendar 格式
      this.calendarOptions.events = res.map(m => ({ ...m, title: m.name, date: m.plan_time })));
  }

  /** 日曆點擊事件 */
   handleDateClick(info: DateClickArg): void {
    this.hanleNewMenu(info);
  }

  /** 菜單點擊 */
  handleMenuClick(menuId: string): void {
    this.route.navigate([ROUTING_PATH.MENU, menuId]);
  }


  /** 打開建立菜單modal */
  hanleNewMenu(info?: DateClickArg): void {
    // info: 點擊calendar, noInfo:點擊新增btn
    const config = info ? {
      data: { time: info.date }
    } : {
      data: {time: new Date()}
    };
    const dialogRef = this.dialog.open(MenuDialogComponent, config
    );
    // 如有新增menu，關閉dialog刷新calendar
    dialogRef.afterClosed().subscribe((res) => {
      if (res) { this.getMenus(); }
    });
  }
}
