import { Observable } from 'rxjs';
import { API, API_METHOD } from './../const/api.const';
import { RequestService } from './request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private requestSvc: RequestService
  ) { }


  getRecord(menuId: string, actionId: number): Observable<any> {
    // TODO:menus
    return this.requestSvc.httpRequest(API_METHOD.GET, `menus/${menuId}/${API.ACTIONS}/${actionId}/${API.RECORDS}`);
  }


  newRecord(menuId: string, actionId: number, record: { reps: number, weight: number }): Observable<any> {
    // TODO:menus
    return this.requestSvc.httpRequest(API_METHOD.POST, `menus/${menuId}/${API.ACTIONS}/${actionId}/${API.RECORDS}`, record);
  }
}
