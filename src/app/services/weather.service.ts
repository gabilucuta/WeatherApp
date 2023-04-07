import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/WeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'f1df8e3b1emshd95c2ef43f9f94cp1f8631jsn3c7541be73b4';
  private apiUrl = 'https://weatherapi-com.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    });
  }

  getCurrentWeather(location: string): Observable<WeatherData> {
    const url = `${this.apiUrl}/current.json?q=${location}`;
    const headers = this.getHeaders();
    return this.http.get<WeatherData>(url, { headers });

  }

  getWeatherForecast(location: string, numberOfDays : number): Observable<WeatherData> {
    const url = `${this.apiUrl}/forecast.json?q=${location}&days=${numberOfDays}`;
    const headers = this.getHeaders();
    return this.http.get<WeatherData>(url, { headers });
  }

  getWeatherForecastHourly(location: string, date: Date, numberOfDays : number): Observable<WeatherData> {
    const currentDate = new Date(date);

    const currentTimestamp = Math.floor(currentDate.getTime() / 1000);
    const nextHoursTimestamp = currentTimestamp + (numberOfDays * 3600);

    const url = `${this.apiUrl}/forecast.json?q=${location}&dt=${nextHoursTimestamp}&hourly=${numberOfDays}`;
    const headers = this.getHeaders();
    return this.http.get<WeatherData>(url, { headers });
  }

  getLocationData(latitude: number, longitude: number): Promise<any> {
    const url = `https://weatherapi-com.p.rapidapi.com/timezone.json?q=${latitude},${longitude}`;
    const headers = this.getHeaders();
    return this.http.get<WeatherData>(url, { headers }).toPromise();
  }
}
