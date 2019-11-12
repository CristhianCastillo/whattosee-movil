import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalProviderService } from './global-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  public URL: string = 'http://whattosee.ml:8088';
  // public URL: string = 'http://localhost:8088';

  constructor(public http: HttpClient, private globalService: GlobalProviderService) { }

  getDiscussions(): Observable<any> {
    return this.http.get<any>(`${this.URL}/discussions`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  createComment(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/discussions/comment`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }
}
