import { MenusService } from './../../core/services/menus.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  constructor(
    private menuSvc: MenusService
  ) { }

  ngOnInit(): void {
    this.getMenus();
  }


  getMenus(): void {
    this.menuSvc.getMenus().subscribe(console.log);

  }
}
