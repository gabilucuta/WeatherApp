import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiUrl = 'https://referential.p.rapidapi.com/v1/city';

  constructor(private http: HttpClient) {}

  getCities(cityName: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': 'f1df8e3b1emshd95c2ef43f9f94cp1f8631jsn3c7541be73b4',
        'X-RapidAPI-Host': 'referential.p.rapidapi.com'
      }),
      params: {
        'fields': 'timezone',
        'lang': 'en',
        'name': cityName,
        'limit': '250'
      }
    };
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}