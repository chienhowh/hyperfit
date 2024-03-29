
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './content/calendar/calendar.component';
import { ROUTING_PATH } from '../app/core/const/routing-path.const';

const routes: Routes = [
  { path: ROUTING_PATH.CALENDAR, component: CalendarComponent },
  { path: ROUTING_PATH.MENU + '/:menuid', loadChildren: () => import('./content/menu/menu.module').then(m => m.MenuModule) },
  { path: '', redirectTo: '/' + ROUTING_PATH.CALENDAR, pathMatch: 'full' },
  { path: '**', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
