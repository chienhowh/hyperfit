

import { ROUTING_PATH } from './const/routing-path.const';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './content/calendar/calendar.component';

const routes: Routes = [
  { path: ROUTING_PATH.CALENDAR, component: CalendarComponent },
  { path: ROUTING_PATH.MENU, loadChildren: () => import('./content/menu/menu.module').then(m => m.MenuModule) },
  { path: '', redirectTo: '/' + ROUTING_PATH.CALENDAR, pathMatch: 'full' },
  { path: '**', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
