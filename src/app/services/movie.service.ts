import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalProviderService } from './global-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public URL: string = 'http://whattosee.ml:8088';
  // public URL: string = 'http://localhost:8088';

  constructor(public http: HttpClient, private globalService: GlobalProviderService) { }

  getMoviGenders(): Observable<any> {
    return this.http.get<any>(`${this.URL}/genders/get-all`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  getMovisByGender(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/genders/id/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  createComment(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/comments`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  scoreMovie(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/movies/score`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }
}
