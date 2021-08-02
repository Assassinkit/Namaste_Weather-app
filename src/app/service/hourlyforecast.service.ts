import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WEATHER_API_KEY } from 'src/api';

const apiKey = WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?";
const currentLocationUrl = "https://api.openweathermap.org/data/2.5/weather?";
const airpollution = "http://api.openweathermap.org/data/2.5/air_pollution?";
@Injectable({
  providedIn: 'root'
})
export class HourlyforecastService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) : Observable<any> {
    return this.http.get(baseUrl + loc +'&appid=' + apiKey + '&units=metric');
  }

  getDailyForecast(lat : string, lon : string) : Observable<any> {
    return this.http.get(forecastUrl + 'lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=' + apiKey + '&units=metric');
  }

  getGeoLocationWeather(lat : string, lon : string) : Observable<any> {
    return this.http.get(currentLocationUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric');
  }
  
  getairpollution(lat : string, lon : string) : Observable<any> {
    return this.http.get(airpollution + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric');
  }
}
