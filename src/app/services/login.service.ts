import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public URL: string = 'http://whattosee.ml:8088';
  // public URL: string = 'http://localhost:8088';

  constructor(public http: HttpClient) { }

  loginUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/users/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
