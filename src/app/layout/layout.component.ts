import { ROUTING_PATH } from './../core/const/routing-path.const';
import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material/sidenav';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  get ROUTING_PATH(): typeof ROUTING_PATH {
    return ROUTING_PATH;
  }

  listItems = [
    { title: '行事曆', router: ROUTING_PATH.CALENDAR },
    { title: '課表', router: ROUTING_PATH.MENU },
    { title: '收件夾', router: 'aaa' },
  ];

  ngOnInit(): void {


  }

  toggleSide(side: MatSidenav): void {
    side.toggle().then((res: MatDrawerToggleResult) => {
      console.log(res);
    });
  }


}
