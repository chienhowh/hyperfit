import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAction } from '../interfaces/server.interface';
import { API, API_METHOD } from '../const/api.const';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private requestSvc: RequestService
  ) { }

  /**
   * 取得菜單所有動作
   * @param menuId 菜單id
   */
  getActions(menuId:string): Observable<IAction[]> {
    return this.requestSvc.httpRequest(API_METHOD.GET, `${API.MENU}/${menuId}/${API.ACTIONS}`);

  }
}
