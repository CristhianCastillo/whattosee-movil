import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public URL: string = 'http://whattosee.ml:8088';
  // public URL: string = 'http://localhost:8088';

  constructor(public http: HttpClient) { }

  registerUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/users/register`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
