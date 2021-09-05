import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { MenusService } from './../../core/services/menus.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IMenu } from './menu.interface';
import { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
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
    events: [
      { title: '平日菜單', date: '2021-07-26T14:07:49.628774+00:00' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  /** 菜單列表 */
  menuList = [{
    User: 1,
    _last_modified: '2021-07-26T14:07:49.628780+00:00',
    actions: [
      {
        _last_modified: '2021-07-26 14:07:49.629694',
        action_id: 3,
        content: '握推32*12下*2組(計畫)',
        menu_id: 2,
        records: [
          {
            Action: 3,
            _last_modified: '2021-07-26T14:07:49.630708+00:00',
            record_id: 2,
            reps: 11,
            weight: 32
          },
          {
            Action: 3,
            _last_modified: '2021-07-26T14:07:49.630432+00:00',
            record_id: 1,
            reps: 12,
            weight: 32
          }
        ]
      }
    ],
    menu_id: 2,
    name: '平日菜單',
    plan_time: '2021-07-26T14:07:49.628774+00:00'
  },
  {
    User: 1,
    _last_modified: '2021-07-26T14:07:49.628786+00:00',
    actions: [
      {
        _last_modified: '2021-07-26 14:07:49.629700',
        action_id: 4,
        content: '深蹲15*20下*3組(計畫)',
        menu_id: 3,
        records: [
          {
            Action: 4,
            _last_modified: '2021-07-26T14:07:49.630887+00:00',
            record_id: 4,
            reps: 19,
            weight: 14
          },
          {
            Action: 4,
            _last_modified: '2021-07-26T14:07:49.630803+00:00',
            record_id: 3,
            reps: 20,
            weight: 15
          }
        ]
      }
    ],
    menu_id: 3,
    name: '假日菜單',
    plan_time: '2021-07-26T14:07:49.628784+00:00'
  },
  {
    User: 1,
    _last_modified: '2021-07-27T13:10:54.557317+00:00',
    actions: [],
    menu_id: 6,
    name: 'adf',
    plan_time: '2021-07-27T00:00:00+00:00'
  },
  {
    User: 1,
    _last_modified: '2021-07-27T13:11:08.055528+00:00',
    actions: [],
    menu_id: 7,
    name: 'adf',
    plan_time: '2021-07-21T00:00:00+00:00'
  }
  ];
  constructor(
    private menuSvc: MenusService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // TODO:插入ＡＰＩ
    this.getMenus();
    // this.calendarOptions.events = this.menuList.map(m => ({ ...m, title: m.name, date: m.plan_time }));

  }


  getMenus(): void {
    this.menuSvc.getMenus().subscribe((res: IMenu[]) =>
      this.calendarOptions.events = res.map(m => ({ ...m, title: m.name, date: m.plan_time })));
  }

  /** 日曆點擊事件 */
  handleDateClick(info: DateClickArg): void {
    alert('Date: ' + info.dateStr);

  }

  /** 打開菜單建立modal */
  hanleNewMenu(info?: DateClickArg): void {
    const config = {
      data: {}
    };
    const dialogRef = this.dialog.open(MenuDialogComponent, config
    );
    // 如有新增menu，關閉dialog刷新calendar
    dialogRef.afterClosed().subscribe((res) => {
      if (res) { this.getMenus(); }
    });
  }
}
