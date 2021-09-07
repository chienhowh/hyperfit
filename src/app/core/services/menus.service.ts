import {IMenu} from '../interfaces/server.interface';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { API, API_METHOD } from '../const/api.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(
    private requestSvc: RequestService
  ) { }

  /**
   * 取得所有課表
   */
  getMenus(): Observable<IMenu[]> {
    return this.requestSvc.httpRequest(API_METHOD.GET, API.MENU);
  }

  postMenu(params: any): Observable<any> {
    return this.requestSvc.httpRequest(API_METHOD.POST, API.MENU, params);
  }

  getMenuById(menuId: string): Observable<IMenu> {
    return this.requestSvc.httpRequest(API_METHOD.GET, `${API.MENU}/${menuId}`);
  }
}





