import { API, API_METHOD } from './../const/api.const';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  // TODO:設定method 的type
  httpRequest(method: string, url: string, params?: any): any {
    const endpoint = `${environment.DEFAULT_IP}/${url}`;
    const headers = this.getHttpHeaders();
    switch (method) {
      case API_METHOD.GET:
        return this.http.get(endpoint, { headers });
      case API_METHOD.POST:
        return this.http.post(endpoint, params, { headers });
      case API_METHOD.PUT:
        return this.http.put(endpoint, params, { headers });
      case API_METHOD.DELETE:
        return this.http.delete(endpoint, { headers })
          .pipe(catchError(r => of('')));
      default:
        console.warn('API METHOD WRONG');
    }
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb20uemFsYW5kby5jb25uZXhpb24iLCJpYXQiOjE2MjcxOTkzMTUsImV4cCI6MTAwMDAwMDAwMTYyNzE5OTMxNSwic3ViIjoiMSJ9.CF0FOEpnZpHHH7SBflQ8q-BPGe-He8nvihhPgozf3Xs',
      Accept: 'application/json'
    });
  }
}
